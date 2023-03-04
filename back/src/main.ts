//@ts-nocheck
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { Liquid } from 'liquidjs';
import { liquidColorFilters } from 'liquidjs-color-filters';
const liquidEngine = new Liquid();
liquidEngine.plugin(liquidColorFilters);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.engine('liquid', liquidEngine.express());
  app.setViewEngine('liquid');
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}

bootstrap();
