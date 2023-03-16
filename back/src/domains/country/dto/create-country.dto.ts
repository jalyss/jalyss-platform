import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDto {

    @ApiProperty({ required: true })
    nameAr: string;
    @ApiProperty({ required: true })
    nameEn: string;
}