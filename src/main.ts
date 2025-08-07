import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in DTO
      forbidNonWhitelisted: true, // throws error if extra properties are sent
      forbidUnknownValues: true, // throws error if body is empty or wrong
      transform: true, // auto transform payloads to DTO classes
    }),
  );
  await app.listen(process.env.PORT ?? 5060);
}
void bootstrap();
