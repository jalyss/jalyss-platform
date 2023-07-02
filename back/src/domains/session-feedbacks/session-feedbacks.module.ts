import { Module } from '@nestjs/common';
import { SessionFeedbacksService } from './session-feedbacks.service';
import { SessionFeedbacksController } from './session-feedbacks.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SessionFeedbacksController],
  providers: [SessionFeedbacksService,PrismaService]
})
export class SessionFeedbacksModule {}
