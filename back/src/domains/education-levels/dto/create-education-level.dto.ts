import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationLevelDto {
  @ApiProperty()
  nameAr: string;
  @ApiProperty()
  nameEn: string;
  @ApiProperty()
  nameFr: string;
}
