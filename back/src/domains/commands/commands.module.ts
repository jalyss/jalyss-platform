import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BranchesService } from 'src/domains/branches/branches.service';

@Module({
  controllers: [CommandsController],
  providers: [CommandsService,PrismaService,BranchesService]
})
export class CommandsModule {}
