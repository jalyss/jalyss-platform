import { ApiProperty } from '@nestjs/swagger';
import { lectures } from './../../../../../front/src/dummydata';

export class CreateLectureDto {
  @ApiProperty()
  titleEn: string;
  @ApiProperty()
  titleAr: string;
  @ApiProperty()
  contentAr: string;
  @ApiProperty()
  contentEn: string;
  @ApiProperty()
  lecturesHasGainsIds: string[];
  @ApiProperty()
  cochingIds: string[];
}
