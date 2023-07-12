import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionFeedbackDto } from './create-session-feedback.dto';

export class UpdateSessionFeedbackDto extends PartialType(CreateSessionFeedbackDto) {}
