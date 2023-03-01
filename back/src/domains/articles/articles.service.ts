import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BranchesService } from 'src/domains/branches/branches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { filterExample } from './entities/article.entity';
import { FilterArticle } from './types';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly branchService: BranchesService,
  ) {}

  async create(dto: CreateArticleDto, branchId: string) {
    return await this.prisma.article.create({
      data: {
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      include: {
        ArticlesByBranch: true,
      },
    });
  }

  async findAllByBranch(branchId: string, filters: FilterArticle) {
    branchId = (await this.branchService.findBranchByIdOrIdentifier(branchId))!.id;
    let insideWhere = {};
    //controle query=> filters
    if (Object.entries(filters).length > 0) {
      console.log('=======> filter', filters);
      let errors = [];
      Object.entries(filters).forEach(([key, value]) => {
        if (!filterExample[key]) {
          errors.push(key);
        }
        if (['lte', 'gte'].includes(key)) {
          insideWhere['price'] = {
            ...insideWhere['price'],
            [key]: value,
          };
        } else {
          insideWhere[key] = value;
        }
      });
      if (errors.length > 0) {
        throw new HttpException(
          errors.join(' ') + ' filter(s) name error',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    //
    if (filters.bestSaller) {
      return await this.prisma.commandLine.groupBy({
        by: ['articleByBranchId'],
        _count: {
          articleByBranchId: true,
        },
        orderBy: {
          _count: {
            articleByBranchId: 'desc',
          },
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
        ...insideWhere,
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
