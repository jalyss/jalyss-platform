import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
@ApiProperty()
content: string;

@ApiProperty()
confirm: boolean;
@ApiProperty()
userId:string
@ApiProperty()
categoryId:string
}
