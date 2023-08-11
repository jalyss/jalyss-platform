import { Module } from '@nestjs/common';
import { ClientsService } from './client.service';
import { clientsController } from './client.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationLevelsController } from '../education-levels/education-levels.controller';
import { FunctionalAreasController } from '../functional-areas/functional-areas.controller';
import { JobTitlesController } from '../job-titles/job-titles.controller';
import { CitiesController } from '../cites/cities.controller';
import { countriesController } from '../country/countries.controller';
import { EducationLevelsService } from '../education-levels/education-levels.service';
import { CitiesService } from '../cites/cities.service';
import { countriesService } from '../country/countries.service';
import { JobTitlesService } from '../job-titles/job-titles.service';
import { FunctionalAreasService } from '../functional-areas/functional-areas.service';

@Module({
  controllers: [
    clientsController,
    EducationLevelsController,
    FunctionalAreasController,
    JobTitlesController,
    CitiesController,
    countriesController,
  ],
  providers: [
    ClientsService,
    PrismaService,
    EducationLevelsService,
    JobTitlesService,
    FunctionalAreasService,
    CitiesService,
    countriesService,
  ],
})
export class ClientsModule {}
