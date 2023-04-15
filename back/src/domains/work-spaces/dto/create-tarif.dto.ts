import { ApiProperty } from '@nestjs/swagger';
export class CreateTarifDto {
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: String, required: false })
  duration?: string;

  @ApiProperty({ type: String })
  serviceId: string;
}