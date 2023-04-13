import { Module } from '@nestjs/common';
import { WorkSpacesService } from './work-spaces.service';
import { WorkSpacesController } from './work-spaces.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  controllers: [WorkSpacesController,BookingController],
  providers: [WorkSpacesService,PrismaService,BookingService],

})
export class WorkSpacesModule {}
