import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
   
    @ApiProperty()
    blogId:string
    @ApiProperty()
    userId:string
  
}