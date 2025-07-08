import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { LoggerService } from 'src/logger/logger.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async signup(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ name, email, password: hashed });
    this.logger.log(`Signup attempt for ${email}`);
    return newUser.save();
  }

  async signin(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.error('Something went wrong', 'stackTraceHere');
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
