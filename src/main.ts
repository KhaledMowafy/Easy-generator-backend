import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // ✅ enables CORS for all origins
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that aren't in the DTO
      forbidNonWhitelisted: true, // throws error if extra properties exist
      transform: true, // auto-transforms payloads to match DTO classes
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The authentication API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
