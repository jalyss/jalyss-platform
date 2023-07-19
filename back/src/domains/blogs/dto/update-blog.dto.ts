import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { StatusBlog } from '@prisma/client';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
export class UpdateBlogDecisionDto {
  confirm: StatusBlog;
  reason: string;
}
