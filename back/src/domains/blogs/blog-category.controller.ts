import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { BlogsCategoryService } from './blog-category.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';

@Controller('blogsCategory')
export class BlogsCategoryController {
  constructor(private readonly blogsCategoryService: BlogsCategoryService) {}

  @Post()
  create(@Body() CreateBlogCategoryDto: CreateBlogCategoryDto) {
    return this.blogsCategoryService.create(CreateBlogCategoryDto);
  }

  @Get()
  findAll() {
    return this.blogsCategoryService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateBlogCategoryDto: UpdateBlogCategoryDto) {
    return this.blogsCategoryService.update(id, UpdateBlogCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsCategoryService.remove(id);
  }
}
