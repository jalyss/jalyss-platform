import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionHasLectureDto {
 @ApiProperty()
 lectureId:string;
 @ApiProperty()
 sessionId: string[];; 


}