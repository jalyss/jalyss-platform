import { PartialType } from '@nestjs/mapped-types';
import { CreateFunctionalAreaProposalDto } from './create-functional-areaProposal.dto';

export class UpdateFunctionalAreaProposalDto extends PartialType(CreateFunctionalAreaProposalDto) {}
