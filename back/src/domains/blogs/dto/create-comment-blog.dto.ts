import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentBlogDto {
@ApiProperty()
content: string;
@ApiProperty()
userId:string
@ApiProperty()
blogId:string
}
