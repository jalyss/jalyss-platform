import { ApiProperty } from '@nestjs/swagger';

export class CreateJobTitleProposalDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  clientId: string;
}
