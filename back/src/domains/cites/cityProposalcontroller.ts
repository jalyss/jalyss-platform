import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {CityProposalsService } from './cityProposal.service';
import { CreateCityProposalDto } from './dto/create-cityProposal.dto';
import { UpdateCityProposalDto } from './dto/update-cityProposal.dto';
@ApiTags('City Proposals')
@Controller('city-porposals/')
export class CityProposalsController {
  constructor(private readonly cityProposalsService: CityProposalsService) {}

  @Post(':countryId')
  create(
    @Body() dto: CreateCityProposalDto,
    @Param('countryId') countryId: string,
  ) {
    return this.cityProposalsService.create(dto,countryId);
  }

  @Get(':countryId')
  findAll(@Param('countryId') countryId: string) {
    return this.cityProposalsService.findAll(countryId);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.cityProposalsService.findOne(id);
  }

  @Get()
  findAllCitites() {
    return this.cityProposalsService.findAllCitites();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCityProposalDto) {
    return this.cityProposalsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityProposalsService.remove(id);
  }
}
