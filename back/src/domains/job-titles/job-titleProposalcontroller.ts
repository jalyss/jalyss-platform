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
import { JobTitleProposalsService } from './job-titleProposal.service';
import { CreateJobTitleProposalDto } from './dto/create-functional-areaProposal.dto';
import { UpdateJobTitleProposalDto } from './dto/update-functional-areaProposal.dto';

@ApiTags('Job Title Proposals')
@Controller('job-title-porposals/')

export class JobTitleProposalsController {
  constructor(
    private readonly service: JobTitleProposalsService,
  ) {}

  @Post()
  create(@Body() dto: CreateJobTitleProposalDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateJobTitleProposalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
