import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { LoggerService } from 'src/logger/logger.service';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

interface MongoDuplicateKeyError {
  code: number;
  keyValue?: Record<string, string>;
}

function isMongoDuplicateKeyError(
  error: unknown,
): error is MongoDuplicateKeyError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as Record<string, unknown>).code === 11000 &&
    'keyValue' in error &&
    typeof (error as Record<string, unknown>).keyValue === 'object'
  );
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async signup(name: string, email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      this.logger.warn(`Signup failed: user already exists (${email})`);
      throw new BadRequestException('A user with this email already exists.');
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ name, email, password: hashed });

    try {
      const savedUser = await newUser.save();
      this.logger.log(`Signup success for ${email}`);
      return savedUser;
    } catch (error: unknown) {
      if (isMongoDuplicateKeyError(error)) {
        const conflictEmail = error.keyValue?.email ?? 'unknown';
        this.logger.warn(`Duplicate email: ${conflictEmail}`);
        throw new BadRequestException(
          `A user with email "${conflictEmail}" already exists.`,
        );
      }

      this.logger.error(
        `Unexpected error during signup for ${email}`,
        (error as Error)?.stack,
      );
      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async signin(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.error('Something went wrong', 'stackTraceHere');
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email };
    const { _id, email: userEmail, name } = user;
    return {
      data: {
        _id,
        email: userEmail,
        name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
