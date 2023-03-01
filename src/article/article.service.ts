import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BranchesService } from 'src/branches/branches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Filters } from './entities/article.entity';
import { Filter } from './types';
//create an other class createAricleByBranchDto
//so we have two creates function in the service and two controllers Post
//one for createArticle and one for articleByBranch
@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly branchService: BranchesService) { }
  async create(dto: CreateArticleDto, categoryId: string, publishingHouseId: string) {

    const category = await this.branchService.findBranchByIdOrIdentifier(
      categoryId,
    );
    const publishingHouse = await this.branchService.findBranchByIdOrIdentifier(
      publishingHouseId,

    );
    return await this.prisma.article.create({
      data: {
        ...dto,
        categoryId : dto.categoryId,
        publishingHouseId: dto.publishingHouseId,
        ArticlesByBranch: { create: dto.ArticleByBranch },
        Supply: { create: dto.Supply }
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