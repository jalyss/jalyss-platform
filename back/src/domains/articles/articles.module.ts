import { Module } from '@nestjs/common';
import { ArticleService } from './articles.service';
import { ArticleController } from './articles.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BranchesService } from 'src/domains/branches/branches.service';
import { ArticleTypeController } from './articleTypes.controller';
import { ArticleTypeService } from './articleTypes.service';
import { PublishingHouseController } from './publishingHouses.controller';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import { PublishingHouseService } from './publishingHouses.service';
import { authorService } from './author.service';
import { authorController } from './author.controller';
import { MvtController } from './mvts.controller';
import { MvtsService } from './mvts.service';

@Module({
  controllers: [
    ArticleController,
    ArticleTypeController,
    PublishingHouseController,
    CategoryController,
    authorController,
    MvtController
  ],
  providers: [
    ArticleService,
    ArticleTypeService,
    CategoryService,
    PublishingHouseService,
    PrismaService,
    BranchesService,
    authorService,
    MvtsService
  ],
})
export class ArticleModule {}
