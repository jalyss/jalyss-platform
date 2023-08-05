import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
    @ApiProperty({ required: true })
    fullNameEn: string
    @ApiProperty({ required: true })
    fullNameAr: string;
    @ApiProperty({ required: true })
    email: string;
    @ApiProperty({ required: true })
    address: string
    @ApiProperty({ required: true })
    tel: string;
    @ApiProperty({ required: true })
    accountBalance: number;
}
