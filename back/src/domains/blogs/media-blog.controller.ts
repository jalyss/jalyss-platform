import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { MediaBlogService } from './media-blog.service';
import { CreateMediaBlogDto } from './dto/create-media-blog.dto';
import { UpdateMediaBlogDto } from './dto/update-media-blog.dto';

@Controller('mediaBlog')
export class MediaBlogController {
  constructor(private readonly mediaBlogService: MediaBlogService) {}

  @Post()
  create(@Body() CreateReplyDto: CreateMediaBlogDto) {
    return this.mediaBlogService.create(CreateReplyDto);
  }

  @Get()
  findAll() {
    return this.mediaBlogService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaBlogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateMediaBlogDto: UpdateMediaBlogDto) {
    return this.mediaBlogService.update(id, UpdateMediaBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaBlogService.remove(id);
  }
}
