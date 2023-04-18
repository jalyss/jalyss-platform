import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogLikeDto {
 
  @ApiProperty()
  userId: string;

  @ApiProperty()
  blogId: string;

  @ApiProperty()
  likeCategoryId: string;

 
}
