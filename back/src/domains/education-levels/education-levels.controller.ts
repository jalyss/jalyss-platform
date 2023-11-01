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
import { EducationLevelsService } from './education-levels.service';
import { CreateEducationLevelDto } from './dto/create-education-level.dto';
import { UpdateEducationLevelDto } from './dto/update-education-level.dto';
import { ApiTags } from '@nestjs/swagger';
import { EducationLevelFilters } from './entities/education-level.entity';

@ApiTags('educationLevel')
@Controller('educationLevel')
export class EducationLevelsController {
  constructor(
    private readonly educationLevelsService: EducationLevelsService,
  ) {}

  @Post()
  create(@Body() dto: CreateEducationLevelDto) {
    return this.educationLevelsService.create(dto);
  }

  @Get()
  findAll(@Query() filters: EducationLevelFilters) {
    return this.educationLevelsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationLevelsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationLevelDto: UpdateEducationLevelDto,
  ) {
    return this.educationLevelsService.update(id, updateEducationLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationLevelsService.remove(id);
  }
}
