import { PartialType } from '@nestjs/swagger';
import { CreateWorkSpaceDto } from './create-work-space.dto';

export class UpdateWorkSpaceDto extends PartialType(CreateWorkSpaceDto) {}
