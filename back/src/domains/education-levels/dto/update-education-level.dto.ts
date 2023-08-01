import { PartialType } from '@nestjs/swagger';
import { CreateEducationLevelDto } from './create-education-level.dto';

export class UpdateEducationLevelDto extends PartialType(CreateEducationLevelDto) {}
