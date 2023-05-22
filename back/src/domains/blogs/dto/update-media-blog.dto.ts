import { PartialType } from '@nestjs/swagger';
import { CreateMediaBlogDto } from './create-media-blog.dto';

export class UpdateMediaBlogDto extends PartialType(CreateMediaBlogDto) {}
