import { PartialType } from '@nestjs/mapped-types';
import { CreateSearchEngineDto } from './create-search-engine.dto';

export class UpdateSearchEngineDto extends PartialType(CreateSearchEngineDto) {}
