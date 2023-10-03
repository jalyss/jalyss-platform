import { Module } from '@nestjs/common';


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
import { SessionFeedbacksController } from './session-feedbacks.controller';
import { SessionFeedbacksService } from './session-feedbacks.service';
import { SessionHasLectureController } from './sessionHasLecture.controller';
import { SessionHasLectureService } from './sessionHasLecture.service';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { PrerequireController } from './prerequire.controller';
import { GainController } from './gain.controller';
import { PrerequireService } from './prerequire.service';
import { GainService } from './gain.service';

@Module({
  controllers: [
    
    TrainingBookingController,
    SessionTypeController,
    SessionTarifController,
    SessionRequestController,
    SessionController,
    LectureController,
    CoachingController,
    SessionFeedbacksController,
    SessionHasLectureController,
    FeaturesController,
    PrerequireController,
    GainController
  ],
  providers: [
    
    TrainingBookingService,
    SessionTypeService,
    SessionTarifService,
    SessionRequestService,
    SessionService,
    LectureService,
    CoachingService,
    PrismaService,
    SessionFeedbacksService,
    SessionHasLectureService,
    FeaturesService,
    PrerequireService,
    GainService
  ],
})
export class TrainingModule {}
