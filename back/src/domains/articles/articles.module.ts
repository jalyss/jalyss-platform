import { Module } from '@nestjs/common';
import { ArticleService } from './articles.service';
import { ArticleController } from './articles.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BranchesService } from 'src/domains/branches/branches.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService,PrismaService,BranchesService]
})
export class ArticleModule {}
