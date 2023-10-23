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
import { EducationLevelProposalsService } from './education-levelProposal.service';
import { CreateEducationLevelProposalDto } from './dto/create-education-levelProposal.dto';
import { UpdateEducationLevelProposalDto } from './dto/update-educationa-levelProposal.dto';

@ApiTags('Education Level Proposals')
@Controller('education-level-porposals/')

export class EducationLevelProposalsController {
  constructor(
    private readonly service: EducationLevelProposalsService,
  ) {}

  @Post()
  create(@Body() dto: CreateEducationLevelProposalDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateEducationLevelProposalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
