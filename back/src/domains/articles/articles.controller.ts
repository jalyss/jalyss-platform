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
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {  FilterArticle } from './types';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post(':branchId')
  create(
    @Body() createArticleDto: CreateArticleDto,
    @Param('branchId') branchId: string,
    @Param('categoryId') categoryId: string,
    @Param('publishingHouseId') publishingHouseId: string, 
   ) {
    return this.articleService.create(createArticleDto, branchId, categoryId, publishingHouseId);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':branchId')
  findAllByBranch(
    @Param('branchId') branchId: string,
    @Query() filters: FilterArticle,
  ) {
    return this.articleService.findAllByBranch(branchId, filters);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
