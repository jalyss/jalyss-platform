import { ApiProperty } from "@nestjs/swagger";


export class CreateSessionTarifDto {
    @ApiProperty()
    title : string ; 
    @ApiProperty()
    sessionId : string ;
    @ApiProperty() 
    price : number ; 
}