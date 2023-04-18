import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogCategoryDto {
  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameAr: string;
  
}