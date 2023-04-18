import { ApiProperty } from "@nestjs/swagger";


export class CreateTrainingBookingDto {
    @ApiProperty()
    userId:string ; 
    @ApiProperty()
    sessionTarifId:string ;
}