import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  mediaIds?: string[];
  @ApiProperty()
  coverId?: string;
  @ApiProperty()
  title: string;
}
