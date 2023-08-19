import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionTypefDto {
  @ApiProperty()
  titleEn: string;
  @ApiProperty()
  titleAr: string;
}
