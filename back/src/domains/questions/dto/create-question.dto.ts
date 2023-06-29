
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  question: string;
  @ApiProperty()
  answer: string;
}
