import { ApiProperty } from '@nestjs/swagger';
import { CreateWorkSpaceDto } from './create-work-space.dto';
import { CreateTarifDto } from './create-tarif.dto';
export class CreateServiceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  identifier?: string;


}