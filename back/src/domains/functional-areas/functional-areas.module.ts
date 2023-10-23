import { Module } from '@nestjs/common';
import { FunctionalAreasService } from './functional-areas.service';
import { FunctionalAreasController } from './functional-areas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FunctionalAreaProposalsService } from './functional-areaProposal.service';

@Module({
  controllers: [FunctionalAreasController,FunctionalAreasController],
  providers: [FunctionalAreasService, PrismaService,FunctionalAreaProposalsService]
})
export class FunctionalAreasModule {}