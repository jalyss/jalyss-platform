import { PartialType } from '@nestjs/mapped-types';
import { CreateCityProposalDto } from './create-cityProposal.dto';

export class UpdateCityProposalDto extends PartialType(CreateCityProposalDto) {}
