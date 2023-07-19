import { ApiProperty } from '@nestjs/swagger';
import { participant } from './update-chatRoom.dto';

export class CreateChatRoomDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  receiverId: string;
  @ApiProperty()
  text: string;
}
export class CreateChatRoomGroupDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  participants: participant[];
}
