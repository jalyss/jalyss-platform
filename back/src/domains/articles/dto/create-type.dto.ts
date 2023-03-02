import { ApiProperty } from "@nestjs/swagger";

export class CreateTypeDto {
  @ApiProperty({ required: false })
  nameAr: string;
  @ApiProperty({ required: false })
  nameEn: string;


}
