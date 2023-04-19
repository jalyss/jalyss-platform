import { PartialType } from '@nestjs/swagger';
import { CreateCommentBlogDto } from './create-comment-blog.dto';

export class UpdateCommentBlogDto extends PartialType(CreateCommentBlogDto) {}
