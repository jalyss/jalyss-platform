import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  participants: participant[];
}
type participant = {
  value: string;
  label: string;
};
