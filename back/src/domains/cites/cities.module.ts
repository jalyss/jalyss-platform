import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CityProposalsController } from './cityProposalcontroller';
import { CityProposalsService } from './cityProposal.service';

@Module({
  controllers: [CitiesController,CityProposalsController],
  providers: [CitiesService,PrismaService,CityProposalsService]
})
export class CitesModule {}
  
