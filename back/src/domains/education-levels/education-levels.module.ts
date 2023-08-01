import { Module } from '@nestjs/common';
import { EducationLevelsService } from './education-levels.service';
import { EducationLevelsController } from './education-levels.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EducationLevelsController],
  providers: [EducationLevelsService,PrismaService]
})
export class EducationLevelsModule {}
