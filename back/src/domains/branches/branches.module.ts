import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BranchesController],
  providers: [BranchesService,PrismaService]
})
export class BranchesModule {}
