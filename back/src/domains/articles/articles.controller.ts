import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Put
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FilterArticle } from './types';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser';
import { UpdateArticleByBranchDto } from './dto/update-article.ByBranch.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    

  ) {
    return this.articleService.create(createArticleDto);
  }


  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get("/getArticleTitles")
  findArticleTitleAndId() {
    return this.articleService.findArticleTitleAndId();
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
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articleService.update(id, dto);
  }
  @Put(':id')
  updateArticleByBranch(@Param('id') id: string, @Body() dto: UpdateArticleByBranchDto) {
    return this.articleService.updateArticleByBranch(id, dto);
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
