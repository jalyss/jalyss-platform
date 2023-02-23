//@ts-nocheck
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

bootstrap();
