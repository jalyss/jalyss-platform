import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterBlog, FilterBlogExample } from './entities/blog.entity';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBlogDto, authorId: string) {
    let mediaIds = [];
    if (dto.mediaIds) {
      mediaIds = dto.mediaIds;
      delete dto?.mediaIds;
    }
    let data = { ...dto, authorId };
    if (mediaIds.length > 0) {
      data['MediaBlog'] = {
        create: mediaIds.map((id) => ({
          mediaId: id,
        })),
      };
    }
    return await this.prisma.blog.create({
      data,
    });
  }

  async findAll(filters: FilterBlog) {
    let errors = [];
    let where = {};
    let orderBy = {};
    Object.entries(filters).forEach(([key, value], i) => {
      if (!(key in FilterBlogExample)) {
        errors.push(key);
      }
      if (!['take', 'skip', 'trend'].includes(key)) {
        if (Array.isArray(value)) {
          where = { ...where, [key]: { in: value } };
        } else {
          where = {
            ...where,
            [key]: key === 'confirm' ? (value == 1 ? true : false) : value,
          };
        }
      }
    });
    if (errors.length) {
      let verbe = errors.length > 1 ? 'are' : 'is';
      let wrongKeys = '';
      errors.forEach((error, i) => {
        console.log(i);

        let separator = i < errors.length - 1 ? ' /' : '';
        wrongKeys += error + separator + ' ';
      });
      throw new HttpException(
        wrongKeys + verbe + ' not matched',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (filters.trend) {
      orderBy = {
        view: {
          _count: 'desc',
        },
      };
      let blogs = await this.searchBlogs(this.prisma, {}, 6, 0, orderBy);
      console.log('trend', blogs);

      return blogs;
    } else {
      console.log('NoTrend');
      orderBy = { createdAt: 'desc' };
      return await this.prisma.$transaction(async (prisma) => {
        let items = await this.searchBlogs(
          prisma,
          where,
          +filters.take,
          +filters.skip,
          orderBy,
        );
        let count = await prisma.blog.count({ where });

        return { items, count };
      });
    }
  }

  async findOne(id: string) {
    return await this.prisma.blog.findFirst({
      where: {
        id,
      },
      include: {
        MediaBlog: { include: { media: true } },
        author: { include: { avatar: true } },
        category: true,
        cover: true,
      },
    });
  }

  async update(id: string, dto: UpdateBlogDto, userId: string) {
    await this.prisma.$transaction(async (prisma) => {
      let blog = await prisma.blog.findFirstOrThrow({ where: { id } });
      if (blog.authorId !== userId)
        throw new HttpException(
          'this user can not update the blog',
          HttpStatus.BAD_REQUEST,
        );
      // await prisma.mediaBlog.deleteMany({ where: { blogId: id } });
      // let mediaIds = [];
      // if (dto.mediaIds) {
      //   mediaIds = dto.mediaIds;
        delete dto?.mediaIds;
      // }
      let data = { ...dto };
      // if (mediaIds.length > 0) {
      //   data['MediaBlog'] = {
      //     create: mediaIds.map((id) => ({
      //       mediaId: id,
      //     })),
      //   };
      // }
      return await prisma.blog.update({ where: { id }, data });
    });
  }

  async remove(id: string) {
    return await this.prisma.blog.delete({ where: { id } });
  }
  private async searchBlogs(
    prisma: Prisma.TransactionClient,
    where: any,
    take: number,
    skip: number,
    orderBy: any,
  ) {
    return await prisma.blog.findMany({
      where,
      include: {
        MediaBlog: { include: { media: true } },
        _count: { select: { view: true } },
        cover: true,
        category: true,
        author: {
          select: {
            avatar: true,
            fullNameAr: true,
            fullNameEn: true,
            id: true,
          },
        },
      },

      orderBy,
      take,
      skip,
    });
  }
}