import { ApiProperty } from '@nestjs/swagger';

export class CreateTarifDto {
  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  duration?: string;

  @ApiProperty()
  serviceId: string;
}