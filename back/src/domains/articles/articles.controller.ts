import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FilterArticle } from './types';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post(':branchId')
  create(
    @Body() createArticleDto: CreateArticleDto,
    @Param('branchId') branchId: string,

  ) {
    return this.articleService.create(createArticleDto, branchId);
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
  @Get('one-by-branch/:id')
  findOneByBranch(@Param('id') id: string) {
    return this.articleService.findOneByBranch(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Post('rating/:articleByBranchId') 
  async createRating(
    @CurrentUser() user: any,
    @Body() createRatingDto: CreateRatingDto,
    @Param('articleByBranchId') articleByBranchId: string
  ) {
    try {
      // to create rating  
      return await this.articleService.createRating(createRatingDto, user.id, articleByBranchId);
    }
    catch (e) {

      // if the user rated the article before,the will update what rated
      return this.articleService.updateRating(createRatingDto, user.id, articleByBranchId)
    }
  }


}
