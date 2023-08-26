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
import { LikeCategoryService } from './like-category.service';
import { CreateLikeCategoryDto } from './dto/create-like-category.dto';
import { UpdateLikeCategoryDto } from './dto/update-like-category.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('likeCategory')
@Controller('likeCategory')
export class LikeCategoryController {
  constructor(private readonly likeCategoryService: LikeCategoryService) {}

  @Post()
  create(@Body() CreateLikeCategoryDto: CreateLikeCategoryDto) {
    return this.likeCategoryService.create(CreateLikeCategoryDto);
  }

  @Get()
  findAll() {
    return this.likeCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateLikeCategoryDto: UpdateLikeCategoryDto,
  ) {
    return this.likeCategoryService.update(id, UpdateLikeCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeCategoryService.remove(id);
  }
}
