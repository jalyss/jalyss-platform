import { PartialType } from '@nestjs/mapped-types';

import { CreateArticleByBranchDto } from './create-articleByBranch.dto';

export class UpdateArticleByBranchDto extends PartialType(CreateArticleByBranchDto) { }
