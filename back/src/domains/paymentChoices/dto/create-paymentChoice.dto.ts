import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentChoiceDto {
    @ApiProperty({ required: true })
    nameAr: string;
    @ApiProperty({ required: true })
    nameEn: string;
}
