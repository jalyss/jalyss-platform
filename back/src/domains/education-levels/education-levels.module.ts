import { Module } from '@nestjs/common';
import { EducationLevelsService } from './education-levels.service';
import { EducationLevelsController } from './education-levels.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationLevelProposalsController } from './education-levelProposalcontroller';
import { EducationLevelProposalsService } from './education-levelProposal.service';

@Module({
  controllers: [EducationLevelsController,EducationLevelProposalsController],
  providers: [EducationLevelsService,PrismaService,EducationLevelProposalsService]
})
export class EducationLevelsModule {}
