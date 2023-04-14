import { PartialType } from '@nestjs/swagger';
import { CreateTarifDto } from './create-tarif.dto';

export class UpdateTarifDto extends PartialType(CreateTarifDto) {}
