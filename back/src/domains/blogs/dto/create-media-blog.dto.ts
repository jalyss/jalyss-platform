import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaBlogDto {

    @ApiProperty()
    blogId: string;
    @ApiProperty()
    mediaId:string
 
}