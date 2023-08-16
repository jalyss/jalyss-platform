import { ApiProperty } from '@nestjs/swagger';

export class CreateGainDto {
  @ApiProperty()
  contentEn: string;
  @ApiProperty()
  contentAr: string;

}
