import { Controller, Get, Post, Body, Patch, Param, Delete,Query,UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FilterBlog } from './entities/blog.entity';
import {ApiTags,ApiSecurity} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser';

@ApiTags('blogs')
@Controller('blogs')

export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
@ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto,
  @Request() req) {
    console.log(req.user.id);
    
    return this.blogsService.create(createBlogDto,req.user.id);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }
  @Get('with-filters')
  findAllWithFilter(
    @Query() filters:FilterBlog
  ){
    return this.blogsService.findAllWithFilter(filters)
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
   
    
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
