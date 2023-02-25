import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Filters } from './entities/article.entity';
import { Filter, } from './types';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return this.prisma.article.findMany();
  }
  async findAllByBranch(branchIdentifier: string, filters:Filter) {
    //controle query=> filters
    if(Object.entries(filters).length>0){
      console.log("=======>",filters)
      let x=false
      Object.entries(filters).forEach(([key,value])=>{

        if(!Filters[key]){
          console.log(Filters[key]);
          x=true
        }
      })
      if (x){
        throw new HttpException('error filter name', HttpStatus.BAD_REQUEST)
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
            branch: { identifier: branchIdentifier },
          },
        },
      });
    }
    return await this.prisma.articlesByBranch.findMany({
      where: {
        branch: {
          identifier: branchIdentifier,
        },
        price: filters.max,
      },
    });
  }
    

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
