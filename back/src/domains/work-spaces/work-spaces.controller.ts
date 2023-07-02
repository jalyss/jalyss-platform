import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkSpacesService } from './work-spaces.service';
import { CreateWorkSpaceDto } from './dto/create-work-space.dto';
import { UpdateWorkSpaceDto } from './dto/update-work-space.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workSpaces')
@Controller('work-spaces')
export class WorkSpacesController {
  constructor(private readonly workSpacesService: WorkSpacesService) {}

  @Post()
  create(@Body() dto: CreateWorkSpaceDto) {
    return this.workSpacesService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.workSpacesService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.workSpacesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateWorkSpaceDto: UpdateWorkSpaceDto,
  ) {
    return this.workSpacesService.update(id, UpdateWorkSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workSpacesService.remove(id);
  }
  @Post('images/:id')
  createImages(@Body() dto: string[], @Param('id') id: string) {
    return this.workSpacesService.createImages(id,dto)
  }
}
