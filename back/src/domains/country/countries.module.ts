import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { countriesService } from './countries.service';
import { countriesController } from './countries.controller';


@Module({
    controllers:[countriesController],
    providers:[countriesService,PrismaService]

})
export class countriesModule{}