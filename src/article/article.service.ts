import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BranchesService } from 'src/branches/branches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Filters } from './entities/article.entity';
import { Filter } from './types';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService,
   private readonly branchService:BranchesService) {}
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return this.prisma.article.findMany({
      include: {
        ArticlesByBranch: true,
      },
    });
  }

  async findAllByBranch(branchId: string, filters: Filter) {
    branchId = (await this.branchService.findBranchByIdOrIdentifier(branchId))!.id;


    //controle query=> filters
    if (Object.entries(filters).length > 0) {
      console.log('=======> filter', filters);
      let x = false;
      Object.entries(filters).forEach(([key, value]) => {
        if (!Filters[key]) {
          console.log(Filters[key]);
          x = true;
        }
      });
      if (x) {
        throw new HttpException('error filter name', HttpStatus.BAD_REQUEST);
      }
    }
    //
    if (filters.bestSaller) {
      return await this.prisma.commandLine.groupBy({
        by: ['articleByBranchId'],
        _count: {
          _all: true,
        },
        where: {
          command: {
            branchId,
          },
        },
      });
    }
    return await this.prisma.articlesByBranch.findMany({
      where: {
        branchId,
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} article`;
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: string) {
    return `This action removes a #${id} article`;
  }
 
}
