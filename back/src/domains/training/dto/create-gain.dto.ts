import { ApiProperty } from '@nestjs/swagger';

export class CreateGainDto {
  @ApiProperty()
  content: string;
}
