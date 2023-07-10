import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionRequestDto {
    @ApiProperty()
    content : string ; 
     @ApiProperty()
     resumeId : string

}