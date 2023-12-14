import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationLevelProposalDto } from './create-education-levelProposal.dto';

export class UpdateEducationLevelProposalDto extends PartialType(CreateEducationLevelProposalDto) {}
