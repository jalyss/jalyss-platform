import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionRequestDto {
    @ApiProperty()
    content : string ; 
     @ApiProperty()
     userId : string ; 
}