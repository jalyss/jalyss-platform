import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommandDto {

    @ApiProperty({ required: false })
    clientId: string
    @ApiProperty({ required: true })
    clientName: string
    @ApiProperty({ required: true })
    clientAddress: string
    @ApiProperty({ required: true })
    clientTel: string
    @ApiProperty({ required: true })
    clientEmail: string
    @ApiProperty({ required: true })
    payment: string
    @ApiProperty({ required: true })
    montant: number
    @ApiProperty({ required: true })
    commandeDirect: boolean
    @ApiProperty({ required: false })
    countryId?: string
    @ApiProperty({ required: false })
    cityId?: string 
   
    @IsNotEmpty()
    @ApiProperty({ required: true })
    commandLine!: CreateCommandLineDto[] // ! mean required
}
class CreateCommandLineDto {
    // commandId: string;
    articleByBranchId: string;
    quantity: number
}

