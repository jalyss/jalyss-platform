import { PartialType } from '@nestjs/mapped-types';
import { CreateJobTitleProposalDto } from './create-functional-areaProposal.dto';

export class UpdateJobTitleProposalDto extends PartialType(CreateJobTitleProposalDto) {}
