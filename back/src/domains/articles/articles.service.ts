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
  ) { }

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
        media: true,
        cover: true,
        publishingHouse: true,
        category: true,
        type: true
      },
    });
  }

  async findAllByBranch(branchId: string, filters: FilterArticle) {
    branchId = (await this.branchService.findBranchByIdOrIdentifier(branchId))!.id;
    let insideWhere = {};
    let skip = 0
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
          //array
          if (['categories', 'publishingHouses', 'articleTypes', 'authors'].includes(key)) {
            if (Array.isArray(value)) {
              insideWhere['article'] = {}
              switch (key) {
                case 'categories':
                  insideWhere['article']['categoryId'] = {
                    in: value
                  }
                  break;
                case 'publishingHouses':
                  insideWhere['article']['publishingHouseId'] = {
                    in: value
                  }
                  break;
                case 'authors':
                  insideWhere ['article']['ArticleByAuthor']={}
                  insideWhere ['article']['ArticleByAuthor']['some']={}
                  insideWhere['article']['ArticleByAuthor']['some']['authorId'] = {
                    in: value
                  }
                  break;
                default:
                  insideWhere['article']['typeId'] = {
                    in: value
                  }
              }
            }
            else {
              throw new HttpException(key + ' must be array', HttpStatus.BAD_REQUEST)
            }
          } else
            //skip
            if (key === 'skip')
              skip = Number(value)
            //true or false
            else
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
      delete insideWhere['bestSaller']
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
      include: {
        article: { include: { category: true, publishingHouse: true, type: true, cover: true } }
      }, take: 10,
      skip
    });
  }

  async findOneByBranch(id: string) {
    return await this.prisma.articlesByBranch.findFirst({
      where: {
        id
      },
      include: {
        article: { include: { category: true, publishingHouse: true, type: true, cover: true } }
      }

    });
  }
  async findOne(id: string) {
    return await this.prisma.article.findFirst({
      where: {
        id
      },

      include: { category: true, publishingHouse: true, type: true }
    }
    );
  }

  update(id: string, dto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: string) {
    return `This action removes a #${id} article`;
  }
}
