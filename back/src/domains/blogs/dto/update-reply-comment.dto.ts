import { PartialType } from '@nestjs/swagger';
import { CreateReplyDto } from './create-reply-comment.dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {}
