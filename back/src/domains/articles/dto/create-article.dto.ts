import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {

  @ApiProperty({ required: true })
  title: string;
  @ApiProperty({ required: false })
  coverId: string;
  @ApiProperty({ required: false })
  weight: number;
  @ApiProperty({ required: false })
  pageNumber: number;
  @ApiProperty({ required: false })
  code: string;
  @ApiProperty({ required: false })
  shortDescriptionAr: string;
  @ApiProperty({ required: false })
  longDescriptionAr: string;
  @ApiProperty({ required: true })
  categoryId: string;
  @ApiProperty({ required: true })
  publishingHouseId: string;
  @ApiProperty({ required: true })
  typeId: string;

}
