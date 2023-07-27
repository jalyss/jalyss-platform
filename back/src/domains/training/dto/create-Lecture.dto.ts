import { ApiProperty } from "@nestjs/swagger";
import { lectures } from './../../../../../front/src/dummydata';

export class CreateLectureDto {
 @ApiProperty()
 title:string;
 @ApiProperty()
 content: string; 
 @ApiProperty()
  lecturesHasGainsIds: string[];
  @ApiProperty()
  cochingIds: string[];


}