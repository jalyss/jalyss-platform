import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  identifier: string;
  
  @ApiProperty()
  address: string;
  
  @ApiProperty()
  mainBranch: boolean;
}
