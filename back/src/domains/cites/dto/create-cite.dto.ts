import { ApiProperty } from "@nestjs/swagger";

export class CreateCiteDto {
    @ApiProperty({ required: true })
    countryId: string
    @ApiProperty({ required: true })
    nameAr: string;
    @ApiProperty({ required: true })
    nameEn: string;
}
