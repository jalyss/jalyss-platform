import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDto {

    @ApiProperty({ required: true })
    nameAr: string;
    @ApiProperty({ required: true })
    nameEn: string;
    @ApiProperty({ required: true })
    nameFr: string;
    @ApiProperty({ required: true })
    code: string;
}