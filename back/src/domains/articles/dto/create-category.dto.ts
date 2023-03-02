import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ required: false })
  nameAr: string;
  @ApiProperty({ required: false })
  nameEn: string;
}
