import { ApiProperty } from '@nestjs/swagger';

export class CreateCityProposalDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  clientId: string;
}
