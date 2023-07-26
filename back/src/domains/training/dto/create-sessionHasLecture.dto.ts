import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionHasLectureDto {
  @ApiProperty()
  lectureId: string;
  @ApiProperty()
  sessionIds: string[];
  @ApiProperty()
  startAt: string;
  @ApiProperty()
  endAt: string;
}
