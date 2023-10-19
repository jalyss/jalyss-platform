import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountryProposalsController } from './countryProposalcontroller';
import { CountryProposalsService } from './countryProposal.service';


@Module({
    controllers:[CountriesController,CountryProposalsController],
    providers:[CountriesService,PrismaService,CountryProposalsService]

})
export class countriesModule{}