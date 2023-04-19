import { PartialType } from '@nestjs/swagger';
import { CreateViewsDto } from './create-views.dto';

export class UpdateViewsDto extends PartialType(CreateViewsDto) {}
