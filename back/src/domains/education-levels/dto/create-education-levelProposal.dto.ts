import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationLevelProposalDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  clientId: string;
}
