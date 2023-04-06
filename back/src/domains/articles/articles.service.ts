import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { BranchesService } from 'src/domains/branches/branches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { filterExample } from './entities/article.entity';
import { FilterArticle } from './types';
import { CreateRatingDto } from './dto/create-rating.dto';

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
        ArticlesByBranch: { include: { rating: true } },
        media: true,
        cover: true,
        publishingHouse: true,
        category: true,
        type: true,
      },
    });
  }

  async findAllByBranch(branchId: string, filters: FilterArticle) {
    branchId = (await this.branchService.findBranchByIdOrIdentifier(branchId))!.id;
    let insideWhere = {};
    let skip = 0
    //controle query=> filters
    if (Object.entries(filters).length > 0) {

      let errors = [];
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
                  insideWhere['article']['ArticleByAuthor'] = {}
                  insideWhere['article']['ArticleByAuthor']['some'] = {}
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
    let articlesByBranch = await this.prisma.articlesByBranch.findMany({
      where: {
        ...insideWhere,
        branchId,
      },
      orderBy: { price: 'asc' },
      include: {
        rating: true,
        article: { include: { category: true, publishingHouse: true, type: true, cover: true } }
      }, take: 5,
      skip
    });
    return await Promise.all(articlesByBranch.map(async elem => {

      let rating = await this.prisma.rating.groupBy({
        by:['articleByBranchId'],
        _sum: {
          rate: true,
        },
        _count:{rate:true},where:{
          articleByBranchId:elem.id
        }
      })
      console.log(rating);
            
      return({...elem,rating:Math.floor(rating[0]._sum.rate/rating[0]._count.rate)}); 
    }
    ))
  }

  async findOneByBranch(id: string) {
    let articleByBranch= await this.prisma.articlesByBranch.findFirst({
      where: {
        id
      },
      include: {
        rating: true,
        article: { include: { category: true, publishingHouse: true, type: true, cover: true } }
      }
    });
    let rating = await this.prisma.rating.groupBy({
      by:['articleByBranchId'],
      _sum: {
        rate: true,
      },
      _count:{rate:true},where:{
        articleByBranchId:articleByBranch.id
      }
    })
    return {...articleByBranch,rating:Math.floor(rating[0]._sum.rate/rating[0]._count.rate)}
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

  //Rating services
  async createRating(dto: CreateRatingDto, userId: string, articleByBranchId: string) {
    return await this.prisma.rating.create({
      data: { ...dto, userId, articleByBranchId }
    })
  }
  async updateRating(dto: CreateRatingDto, userId: string, articleByBranchId: string) {
    return await this.prisma.rating.update({
      where: {
        articleUser: { userId, articleByBranchId }
      },
      data: {
        commit: dto.commit,
        rate: dto.rate
      }
    })

  }
}
