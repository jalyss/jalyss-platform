import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryProposalDto } from './create-countryProposal.dto';

export class UpdateCountryProposalDto extends PartialType(CreateCountryProposalDto) {}
