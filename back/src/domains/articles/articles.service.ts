import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BranchesService } from 'src/domains/branches/branches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { filterExample } from './entities/article.entity';
import { FilterArticle } from './types';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateArticleByBranchDto } from './dto/update-article.ByBranch.dto';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly branchService: BranchesService,
  ) {}

  async create(dto: CreateArticleDto) {
    const { authorIds, ...rest } = dto;
    return await this.prisma.article.create({
      data: {
        ...rest,
        ArticleByAuthor: {
          create: authorIds.map((authorId) => {
            return {
              authorId,
            };
          }),
        },
      },
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      include: {
        ArticlesByBranch: {
          include: { rating: true, branch: true, article: true },
        },
        media: true,
        cover: true,
        publishingHouse: true,
        category: true,
        type: true,
      },
    });
  }

  findArticleTitleAndId() {
    return this.prisma.article.findMany({
      select: {
        title: true,
        ArticlesByBranch: {
          select: { id: true },
        },
      },
    });
  }

  async findAllByBranch(branchId: string, filters: FilterArticle) {
    branchId = (await this.branchService.findBranchByIdOrIdentifier(branchId))!
      .id;
    const insideWhere = {};
    let skip = 0;
    //controle query=> filters
    if (Object.entries(filters).length > 0) {
      const errors = [];
      Object.entries(filters).forEach(([key, value]) => {
        if (!filterExample[key]) {
          errors.push(key);
        }
        if (['lte', 'gte'].includes(key)) {
          insideWhere['price'] = {
            ...insideWhere['price'],
            [key]: +value,
          };
        } else {
          //array
          if (
            [
              'categories',
              'publishingHouses',
              'articleTypes',
              'authors',
            ].includes(key)
          ) {
            if (Array.isArray(value)) {
              insideWhere['article'] = {};
              switch (key) {
                case 'categories':
                  insideWhere['article']['categoryId'] = {
                    in: value,
                  };
                  break;
                case 'publishingHouses':
                  insideWhere['article']['publishingHouseId'] = {
                    in: value,
                  };
                  break;
                case 'authors':
                  insideWhere['article']['ArticleByAuthor'] = {};
                  insideWhere['article']['ArticleByAuthor']['some'] = {};
                  insideWhere['article']['ArticleByAuthor']['some'][
                    'authorId'
                  ] = {
                    in: value,
                  };
                  break;
                default:
                  insideWhere['article']['typeId'] = {
                    in: value,
                  };
              }
            } else {
              throw new HttpException(
                key + ' must be array',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
          //skip
          else if (key === 'skip') skip = Number(value);
          //true or false
          else insideWhere[key] = value;
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
      delete insideWhere['bestSaller'];
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
    
    const articlesByBranch = await this.prisma.articlesByBranch.findMany({
      where: {
        ...insideWhere,
        branchId,
      },
      orderBy: { price: 'asc' },
      include: {
        rating: true,
        article: {
          include: {
            category: true,
            publishingHouse: true,
            type: true,
            cover: true,
          },
        },
      },
      take: 5,
      skip,
    });
    return await Promise.all(
      articlesByBranch.map(async (elem) => {
        const rating = await this.prisma.rating.groupBy({
          by: ['articleByBranchId'],
          _sum: {
            rate: true,
          },
          _count: { rate: true },
          where: {
            articleByBranchId: elem.id,
          },
        });

        if (rating.length && rating[0]._sum?.rate)
          return {
            ...elem,
            rating: Math.floor(rating[0]._sum.rate / rating[0]._count.rate),
          };
        else return { ...elem, rating: 1 };
      }),
    );
  }

  async findOneByBranch(id: string) {
    const articleByBranch = await this.prisma.articlesByBranch.findFirst({
      where: {
        id,
      },
      include: {
        rating: true,
        article: {
          include: {
            category: true,
            publishingHouse: true,
            type: true,
            cover: true,
          },
        },
      },
    });
    const rating = await this.prisma.rating.groupBy({
      by: ['articleByBranchId'],
      _sum: {
        rate: true,
      },
      _count: { rate: true },
      where: {
        articleByBranchId: articleByBranch.id,
      },
    });
    return {
      ...articleByBranch,
      rating: Math.floor(rating[0]._sum.rate / rating[0]._count.rate),
    };
  }


  async findOne(id: string) {
    return await this.prisma.article.findFirst({
      where: {
        id,
      },
      include: {
        category:true,
        publishingHouse:true,
        type:true,
        ArticlesByBranch:true,
      },
    });
  }

  async update(id: string, dto: UpdateArticleDto) {
    return await this.prisma.article.update({ where: { id }, data: dto });
  }
  async updateArticleByBranch(id: string, dto: UpdateArticleByBranchDto) {
    return await this.prisma.articlesByBranch.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.article.delete({ where: { id } });
  }

  //Rating services
  async createRating(
    dto: CreateRatingDto,
    userId: string,
    articleByBranchId: string,
  ) {
    return await this.prisma.rating.create({
      data: { ...dto, userId, articleByBranchId },
    });
  }
  async updateRating(
    dto: CreateRatingDto,
    userId: string,
    articleByBranchId: string,
  ) {
    return await this.prisma.rating.update({
      where: {
        articleUser: { userId, articleByBranchId },
      },
      data: {
        commit: dto.commit,
        rate: dto.rate,
      },
    });
  }
}
