import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewsDto } from './dto/create-views.dto';
import { UpdateViewsDto } from './dto/update-views.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('views')
@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  create(@Body() CreateReplyDto: CreateViewsDto) {
    return this.viewsService.create(CreateReplyDto);
  }

  @Get()
  findAll() {
    return this.viewsService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateViewsDto: UpdateViewsDto) {
    return this.viewsService.update(id, UpdateViewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewsService.remove(id);
  }
}
