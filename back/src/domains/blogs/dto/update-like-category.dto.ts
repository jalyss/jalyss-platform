import { PartialType } from '@nestjs/swagger';
import { CreateLikeCategoryDto } from './create-like-category.dto';

export class UpdateLikeCategoryDto extends PartialType(CreateLikeCategoryDto) {}
