import { PartialType } from '@nestjs/swagger';
import { CreateFunctionalAreaDto } from './create-functional-area.dto';

export class UpdateFunctionalAreaDto extends PartialType(CreateFunctionalAreaDto) {}
