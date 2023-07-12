import { ApiProperty } from "@nestjs/swagger";


export class CreateTrainingBookingDto {

    @ApiProperty()
    sessionTarifId:string ;
}