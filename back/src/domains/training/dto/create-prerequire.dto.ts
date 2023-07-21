import { ApiProperty } from '@nestjs/swagger';

export class CreatePrerequireDto {
  @ApiProperty()
  content: string;
}
