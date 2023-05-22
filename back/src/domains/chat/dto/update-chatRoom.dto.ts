import { PartialType } from '@nestjs/mapped-types';
import { CreateChatRoomDto } from './create-chatRoom.dto';

export class UpdateChatDto extends PartialType(CreateChatRoomDto) {}
