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
import { CommentBlogService } from './comment-blog.service';
import { CreateCommentBlogDto } from './dto/create-comment-blog.dto';
import { UpdateCommentBlogDto } from './dto/update-comment-blog.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('CommentsBlogs')
@Controller('CommentsBlog')
export class CommentsBlogController {
  constructor(private readonly commentBlogService: CommentBlogService) {}

  @Post()
  create(@Body() CreateCommentBlogDto: CreateCommentBlogDto) {
    return this.commentBlogService.create(CreateCommentBlogDto);
  }

  @Get()
  findAll() {
    return this.commentBlogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentBlogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateCommentBlogDto: UpdateCommentBlogDto,
  ) {
    return this.commentBlogService.update(id, UpdateCommentBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentBlogService.remove(id);
  }
}
