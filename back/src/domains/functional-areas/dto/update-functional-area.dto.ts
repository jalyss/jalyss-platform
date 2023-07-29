import { PartialType } from '@nestjs/mapped-types';
import { CreateFunctionalAreaDto } from './create-functional-area.dto';

export class UpdateFunctionalAreaDto extends PartialType(CreateFunctionalAreaDto) {}
