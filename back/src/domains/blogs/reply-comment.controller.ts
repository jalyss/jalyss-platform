import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { RepliesService } from './reply-comment.service';
import { CreateReplyDto } from './dto/create-reply-comment.dto';
import { UpdateReplyDto } from './dto/update-reply-comment.dto';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  create(@Body() CreateReplyDto: CreateReplyDto) {
    return this.repliesService.create(CreateReplyDto);
  }

  @Get()
  findAll() {
    return this.repliesService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repliesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateReplyDto: UpdateReplyDto) {
    return this.repliesService.update(id, UpdateReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repliesService.remove(id);
  }
}
