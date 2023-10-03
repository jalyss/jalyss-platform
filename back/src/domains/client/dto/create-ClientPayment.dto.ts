import { ApiProperty } from '@nestjs/swagger';

export class CreateClientPaymentDto {
  @ApiProperty()
  label: string;
  @ApiProperty()
  commandId: string;
  @ApiProperty()
  payementChoiseId: string;
  @ApiProperty()
  amount: number;
}

