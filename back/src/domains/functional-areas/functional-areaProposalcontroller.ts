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
import { FunctionalAreaProposalsService } from './functional-areaProposal.service';
import { CreateFunctionalAreaProposalDto } from './dto/create-functional-areaProposal.dto';
import { UpdateFunctionalAreaProposalDto } from './dto/update-functional-areaProposal.dto';

@ApiTags('Functional Area Proposals')
@Controller('Functional-area-porposals/')

export class FunctionalAreaProposalsController {
  constructor(
    private readonly service: FunctionalAreaProposalsService,
  ) {}

  @Post()
  create(@Body() dto: CreateFunctionalAreaProposalDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFunctionalAreaProposalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
