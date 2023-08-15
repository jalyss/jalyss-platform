import { ApiProperty } from '@nestjs/swagger';

export class CreatePrerequireDto {
  @ApiProperty()
  contentEn: string;
  contentAr: string;

}
