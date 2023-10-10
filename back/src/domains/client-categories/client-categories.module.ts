import { Module } from '@nestjs/common';
import { ClientCategoryService } from './client-categories.service';
import {ClientCategoryController } from './client-categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ClientCategoryController],
  providers: [ClientCategoryService,PrismaService]
})
export class ClientCategoryModule {}
  
