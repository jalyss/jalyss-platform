import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { BlogLikesService } from './blog-like.service';
import { CreateBlogLikeDto } from './dto/create-blog-like.dto';
import { UpdateBlogLikeDto } from './dto/update-blog-like.dto';

@Controller('blogLikes')
export class BlogLikesController {
  constructor(private readonly blogLikesService: BlogLikesService) {}

  @Post()
  create(@Body() CreateBlogLikeDto: CreateBlogLikeDto) {
    return this.blogLikesService.create(CreateBlogLikeDto);
  }

  @Get()
  findAll() {
    return this.blogLikesService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogLikesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateBlogLikeDto: UpdateBlogLikeDto) {
    return this.blogLikesService.update(id, UpdateBlogLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogLikesService.remove(id);
  }
}
