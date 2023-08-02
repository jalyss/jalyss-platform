import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  participants: participant[];
}
export type participant = {
  value: string;
  label: string;
};