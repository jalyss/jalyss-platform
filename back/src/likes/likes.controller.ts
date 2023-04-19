import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('Likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() CreateLikeDto: CreateLikeDto) {
    return this.likesService.create(CreateLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body()UpdateLikeDto:UpdateLikeDto) {
    return this.likesService.update(id,UpdateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(id);
  }
}
