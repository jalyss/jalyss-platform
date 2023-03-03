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
import { ArticleTypeService } from './articleTypes.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';


@ApiTags('article types')
@Controller('article-types')
export class ArticleTypeController {
  constructor(private readonly typeService: ArticleTypeService) {}

  @Post()
  create(
    @Body() dto: CreateTypeDto,
   ) {
    return this.typeService.create(dto);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto) {
    return this.typeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove(id);
  }


}
