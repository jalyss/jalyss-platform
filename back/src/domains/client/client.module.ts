import { Module } from '@nestjs/common';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationLevelsController } from '../education-levels/education-levels.controller';
import { FunctionalAreasController } from '../functional-areas/functional-areas.controller';
import { JobTitlesController } from '../job-titles/job-titles.controller';
import { CitiesController } from '../cites/cities.controller';
import { CountriesController } from '../country/countries.controller';
import { EducationLevelsService } from '../education-levels/education-levels.service';
import { CitiesService } from '../cites/cities.service';
import { CountriesService } from '../country/countries.service';
import { JobTitlesService } from '../job-titles/job-titles.service';
import { FunctionalAreasService } from '../functional-areas/functional-areas.service';
import { ClientPaymentController } from './clientPayment.controller';
import { ClientPaymentService } from './clientPayment.service';

@Module({
  controllers: [
ClientPaymentController,
    ClientsController,
    EducationLevelsController,
    FunctionalAreasController,
    JobTitlesController,
    CitiesController,
    CountriesController,
  ],
  providers: [
    ClientPaymentService,
    ClientsService,
    PrismaService,
    EducationLevelsService,
    JobTitlesService,
    FunctionalAreasService,
    CitiesService,
    CountriesService,
  ],
})
export class ClientsModule {}
