import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BranchesService } from 'src/branches/branches.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService,PrismaService,BranchesService]
})
export class ArticleModule {}
