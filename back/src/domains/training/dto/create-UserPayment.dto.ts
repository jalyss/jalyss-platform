import { ApiProperty } from "@nestjs/swagger";


export class CreateUserPaymentDto {

    @ApiProperty() 
    amount : number;

}
