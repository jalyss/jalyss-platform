import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
 
  @ApiProperty()
  userId: string;

  @ApiProperty()
  blogId: string;

  @ApiProperty()
  likeCategoryId: string;

 
}
