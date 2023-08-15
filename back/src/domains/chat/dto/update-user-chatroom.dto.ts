import { PartialType } from '@nestjs/mapped-types';
import { CreateUserChatroomDto } from './create-user-chatroom.dto';

export class UpdateUserChatroomDto extends PartialType(CreateUserChatroomDto) {}