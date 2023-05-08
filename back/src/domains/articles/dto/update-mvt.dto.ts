import { PartialType } from '@nestjs/mapped-types';
import { CreateMvtArticleDto } from './create-mvt.dto';


export class UpdateMvtArticleDto extends PartialType(CreateMvtArticleDto) {}