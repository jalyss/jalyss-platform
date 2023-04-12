import { PartialType } from '@nestjs/mapped-types';
import { CreateCiteDto } from './create-cite.dto';

export class UpdateCiteDto extends PartialType(CreateCiteDto) {}
