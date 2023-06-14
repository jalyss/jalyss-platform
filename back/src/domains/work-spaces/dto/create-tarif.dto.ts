import { ApiProperty } from '@nestjs/swagger';
export class CreateTarifDto {
  @ApiProperty({ type: String })
  name: string;
  
  @ApiProperty({ type: String })
  description: string;
  
  @ApiProperty({ type: String })
  capacity: string;

  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: Number })
  pricePerDay: number;

  @ApiProperty({ type: String, required: false })
  duration?: string;

  @ApiProperty({ type: String })
  serviceId: string;
}