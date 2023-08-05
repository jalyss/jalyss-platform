import { Module } from '@nestjs/common';
import { ClientsService } from './client.service';
import { clientsController } from './client.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [clientsController],
  providers: [ClientsService,PrismaService]
})
export class ClientsModule {}
