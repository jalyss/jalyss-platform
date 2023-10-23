import { ApiProperty } from '@nestjs/swagger';

export class CreateFunctionalAreaProposalDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  clientId: string;
}
