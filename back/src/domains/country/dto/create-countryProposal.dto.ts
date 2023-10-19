import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryProposalDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  clientId: string;
}
