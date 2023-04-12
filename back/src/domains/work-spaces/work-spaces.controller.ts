import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkSpacesService } from './work-spaces.service';
import { CreateWorkSpaceDto } from './dto/create-work-space.dto';
import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { ApiTags } from '@nestjs/swagger';




@ApiTags('workSpaces')
@Controller('work-spaces')
export class WorkSpacesController {
  constructor(private readonly workSpacesService: WorkSpacesService) {}

  @Post()
  create(@Body() createWorkSpaceDto: CreateWorkSpaceDto) {
    return this.workSpacesService.create(createWorkSpaceDto);
  }

  @Get()
  findAll() {
    return this.workSpacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workSpacesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkSpaceDto: UpdateWorkSpaceDto) {
    return this.workSpacesService.update(+id, updateWorkSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workSpacesService.remove(+id);
  }
}
