import { Module } from '@nestjs/common';
import { WorkSpacesService } from './work-spaces.service';
import { WorkSpacesController } from './work-spaces.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ServiceService} from './service.service';
import { ServiceController } from './service.controller';
import { TarifController } from './tarif.controller';
import { TarifService } from './tarif.service';



@Module({
  controllers: [WorkSpacesController,BookingController,ServiceController,TarifController],
  providers: [WorkSpacesService,PrismaService,BookingService,ServiceService,TarifService],

})
export class WorkSpacesModule {}
