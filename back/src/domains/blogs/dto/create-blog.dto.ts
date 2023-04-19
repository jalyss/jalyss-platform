import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  mediaIds?: string[];
}
