import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionTypefDto {
  @ApiProperty()
  title: string;
}
