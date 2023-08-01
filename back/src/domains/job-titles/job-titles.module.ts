import { Module } from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';
import { JobTitlesController } from './job-titles.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [JobTitlesController],
  providers: [JobTitlesService,PrismaService]
})
export class JobTitlesModule {}
