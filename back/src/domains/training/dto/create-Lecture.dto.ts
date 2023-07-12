import { ApiProperty } from "@nestjs/swagger";

export class CreateLectureDto {
 @ApiProperty()
 title:string;
 @ApiProperty()
 content: string; 

}