import { Module } from '@nestjs/common';
import { FunctionalAreasService } from './functional-areas.service';
import { FunctionalAreasController } from './functional-areas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FunctionalAreasController],
  providers: [FunctionalAreasService, PrismaService]
})
export class FunctionalAreasModule {}