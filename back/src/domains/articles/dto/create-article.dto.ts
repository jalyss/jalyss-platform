import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  cover: string;
  @ApiProperty({ required: false })
  wieght: number;
  @ApiProperty({ required: false })
  code: number;
  @ApiProperty({ required: true })
  categoryId: string;
  @ApiProperty({ required: true })
  publishingHouseId: string;
  @ApiProperty({ required: true })
  typeId: string;

}
