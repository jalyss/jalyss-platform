import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  previousSessionId: string;

  @ApiProperty()
  nextSessionId: string;
  @ApiProperty()

  SessionHasFeaturesIds:string[]
}
