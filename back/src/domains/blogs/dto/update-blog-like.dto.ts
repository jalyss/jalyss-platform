import { PartialType } from '@nestjs/swagger';
import { CreateBlogLikeDto } from './create-blog-like.dto';

export class UpdateBlogLikeDto extends PartialType(CreateBlogLikeDto) {}
