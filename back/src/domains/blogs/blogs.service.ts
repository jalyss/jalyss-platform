import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterBlog, FilterBlogExample } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBlogDto) {
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
    return await this.prisma.blog.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.blog.findMany({
      include: { MediaBlog: { include: { media: true } } },
    });
  }

  async findAllWithFilter(filters: FilterBlog) {
    let where = { confirm: true };
    let errors = [];
    Object.entries(filters).forEach(([key, value]) => {
      let filterExample = Object.keys(FilterBlogExample);
      if (filterExample.includes(key)) {
        if (['userId', 'categoryId'].includes(key)) {
          where = { ...where, [key]: { in: value } }; //type of value is array
        } else where = { ...where, [key]: value }; // type of value is string
      } else {
        errors.push(key);
      }
    });
    if (errors.length > 0) {
      let string = '';
      errors.forEach((e) => {
        string = string + e + ' ';
      });
      console.log(string);

      // throw new Error(`${string} not matched for filters`)
      throw new HttpException(
        `${string} not matched for filters`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.blog.findMany({
      where,
      include: { MediaBlog: { include: { media: true } } },
    });
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
    await this.prisma.$transaction(async(prisma)=>{
      await prisma.mediaBlog.deleteMany({where:{blogId:id}})
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
    })

  }

  async remove(id: string) {
    return await this.prisma.blog.delete({ where: { id } });
  }
}
