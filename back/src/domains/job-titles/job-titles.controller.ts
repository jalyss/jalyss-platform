import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from './dto/update-job-title.dto';
import { ApiTags } from '@nestjs/swagger';
import { JobTitleFilters } from './entities/job-title.entity';

@ApiTags('jobTitle')
@Controller('jobTitle')
export class JobTitlesController {
  constructor(private readonly jobTitlesService: JobTitlesService) {}

  @Post()
  create(@Body() dto: CreateJobTitleDto) {
    return this.jobTitlesService.create(dto);
  }

  @Get()
  findAll(@Query() filters: JobTitleFilters) {
    return this.jobTitlesService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobTitlesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobTitleDto: UpdateJobTitleDto,
  ) {
    return this.jobTitlesService.update(id, updateJobTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobTitlesService.remove(id);
  }
}
