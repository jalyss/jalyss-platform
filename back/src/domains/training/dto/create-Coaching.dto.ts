import { ApiProperty } from "@nestjs/swagger";


export class CreateCoachingDto {
    @ApiProperty()
    userId:string ; 
    @ApiProperty()
    lectureId:string ;
}