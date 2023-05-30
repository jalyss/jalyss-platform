import { Controller, Get, Post, Body, Patch, Param, Delete,Query,UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FilterBlog } from './entities/blog.entity';
import {ApiTags,ApiSecurity} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser';
import { FormatLogin } from '../users/users.service';

@ApiTags('blogs')
@Controller('blogs')

export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
@ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto,
  @Request() req) {
   
    
    return this.blogsService.create(createBlogDto,req.user.id);
  }

  @Get()
  findAll( @Query() filters:FilterBlog

  ){
    return this.blogsService.findAll(filters)
  }
 

  @Get('one/:id')
  findOne(@Param('id') id: string) {
   
    
    return this.blogsService.findOne(id);
  }
  
  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto,@CurrentUser() user:FormatLogin) {
   
    return this.blogsService.update(id, updateBlogDto,user.id);
  }
  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
