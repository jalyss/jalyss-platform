import { Module } from '@nestjs/common';
import { WorkSpacesService } from './work-spaces.service';
import { WorkSpacesController } from './work-spaces.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorkSpacesController],
  providers: [WorkSpacesService,PrismaService],

})
export class WorkSpacesModule {}
