import { PartialType } from '@nestjs/mapped-types';
import { CreateCiteDto } from './create.dto';

export class UpdateCiteDto extends PartialType(CreateCiteDto) {}
