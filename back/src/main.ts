//@ts-nocheck

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({optionsSuccessStatus:200,credentials:true,origin:'https://jalyss-prod.netlify.app'});
  app.useStaticAssets('upload',{prefix:'/upload'})
  app.useStaticAssets(join(__dirname, '../../../back-office', 'build'))
  
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Jalyss')
    .setDescription('The Jalyss API description')
    .addApiKey({ type: 'apiKey', name: 'Authorization', in: 'header' },'apiKey')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}

bootstrap();
