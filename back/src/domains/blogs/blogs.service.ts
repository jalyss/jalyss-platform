import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterBlog, FilterBlogExample } from './entities/blog.entity';

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
    Object.keys(filters).forEach((key, i) => {
      if (!(key in FilterBlogExample)) {
        errors.push(key);
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
      let blogsWithViews = this.prisma.view.groupBy({
        by: ['blogId'],
        orderBy: {
          _count: {
            blogId: 'asc',
          },
        },
        take: 6,
      });
      let blogIds = (await blogsWithViews).map((blog) => blog.blogId);
      let blogs = await this.searchBlogs(
        { id: { in: blogIds } },
        undefined,
        undefined,
      );
      blogs = blogs.sort((a, b) => b._count.view - a._count.view);
      console.log('trend');

      return blogs;
    } else {
      console.log('NoTrend');

      return await this.searchBlogs(
        {
          authorId: { in: filters.authorIds },
          categoryId: { in: filters.categoryIds },
          confirm: filters.confirm == 1 ? true : false,
        },
        filters.take,
        filters.skip,
      );
    }
  }

  async findOne(id: string) {
    return await this.prisma.blog.findFirst({
      where: {
        id,
      },
      include: { MediaBlog: { include: { media: true } } },
    });
  }

  async update(id: string, dto: UpdateBlogDto) {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.mediaBlog.deleteMany({ where: { blogId: id } });
      let mediaIds = [];
      if (dto.mediaIds) {
        mediaIds = dto.mediaIds;
        delete dto?.mediaIds;
      }
      let data = { ...dto };
      if (mediaIds.length > 0) {
        data['MediaBlog'] = {
          create: mediaIds.map((id) => ({
            mediaId: id,
          })),
        };
      }
      return await prisma.blog.update({ where: { id }, data });
    });
  }

  async remove(id: string) {
    return await this.prisma.blog.delete({ where: { id } });
  }
  private async searchBlogs(where: any, take: number, skip: number) {
    return await this.prisma.blog.findMany({
      where,
      include: {
        MediaBlog: { include: { media: true } },
        _count: { select: { view: true } },
        category: true,
        author: { include: { avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    });
  }
}
