import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';


@Module({
    controllers:[CountriesController],
    providers:[CountriesService,PrismaService]

})
export class countriesModule{}