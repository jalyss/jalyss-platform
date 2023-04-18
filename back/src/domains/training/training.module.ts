import { Module } from '@nestjs/common';
import { UserPaymentService } from './userPayment.service';
import { UserPaymentController } from './userPayment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrainingBookingController } from './trainingBooking.controller';
import { SessionTypeController } from './sessionType.controller';
import { SessionTarifController } from './sessionTarif.controller';
import { SessionRequestController } from './sessionRequest.controller';
import { SessionController } from './session.controller';
import { LectureController } from './lecture.controller';
import { CoachingController } from './coaching.controller';
import { TrainingBookingService } from './trainingBooking.service';
import { SessionTypeService } from './sessionType.service';
import { SessionTarifService } from './sessionTarif.service';
import { SessionRequestService } from './sessionRequest.service';
import { SessionService } from './session.service';
import { LectureService } from './lecture.service';
import { CoachingService } from './coaching.service';

@Module({
  controllers: [
    UserPaymentController,
    TrainingBookingController,
    SessionTypeController,
    SessionTarifController,
    SessionRequestController,
    SessionController,
    LectureController,
    CoachingController,
  ],
  providers: [
    UserPaymentService,
    TrainingBookingService,
    SessionTypeService,
    SessionTarifService,
    SessionRequestService,
    SessionService,
    LectureService,
    CoachingService,
    PrismaService,
  ],
})
export class TrainingModule {}
