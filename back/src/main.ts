//@ts-nocheck
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { Liquid } from 'liquidjs';
import { ValidationPipe } from '@nestjs/common';
// import * as express from 'express';
import { liquidColorFilters } from 'liquidjs-color-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useStaticAssets('upload',{prefix:'/upload'})
  // app.useStaticAssets(join(__dirname, '../../../front', 'build'),
  // // {prefix:'/',expect:'/back-office'}
  // )
  app.useStaticAssets(join(__dirname, '../../../back-office', 'build'))
  
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .addApiKey({ type: 'apiKey', name: 'Authorization', in: 'header' },'apiKey')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}

bootstrap();
