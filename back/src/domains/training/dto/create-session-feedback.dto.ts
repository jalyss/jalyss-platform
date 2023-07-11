

import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionFeedbackDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  sessionId: string;
}
