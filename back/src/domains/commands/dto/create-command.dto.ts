import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommandDto {

    @ApiProperty()
    clientId: string
    @ApiProperty()
    intermediateId?: string
    @ApiProperty()
    clientName: string
    @ApiProperty()
    clientAddress: string
    @ApiProperty()
    clientTel: string
    @ApiProperty()
    clientEmail: string
    @ApiProperty()
    delivered: boolean
    @ApiProperty()
    paid: boolean
    @ApiProperty()
    hasDelivery: boolean
    @ApiProperty()
    countryId?: string
    @ApiProperty()
    cityId?: string // ? mean optional
    @IsNotEmpty()
    @ApiProperty()
    commandLine!: CreateCommandLineDto[] // ! mean required
    
}
class CreateCommandLineDto {
    // commandId: string;
    articleByBranchId: string;
    quantity: number
}

