import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommandDto {

    @ApiProperty({ required: false })
    clientId: string
    @ApiProperty({ required: false })
    intermediateId?: string
   
    @ApiProperty({ required: true })
    clientName: string
    @ApiProperty({ required: true })
    clientAddress: string
    @ApiProperty({ required: true })
    clientTel: string
    @ApiProperty({ required: true })
    clientEmail: string
    @ApiProperty({ required: true })
    delivered: boolean
    @ApiProperty({ required: true })
    paid: boolean
    @ApiProperty({ required: true })
    hasDelivery: boolean
    @ApiProperty({ required: false })
    countryId?: string
    @ApiProperty({ required: false })
    cityId?: string // ? mean optional

    @IsNotEmpty()
    @ApiProperty({ required: true })
    commandLine!: CreateCommandLineDto[] // ! mean required
}
class CreateCommandLineDto {
    // commandId: string;
    articleByBranchId: string;
    quantity: number

}
