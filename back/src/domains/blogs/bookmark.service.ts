import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBookmarkDto, userId: string) {
    let data = {
      blogId: dto.blogId,
      userId: userId,
    };
    return await this.prisma.bookmark.create({ data });
  }

  async findAll() {
    return await this.prisma.bookmark.findMany({});
  }

  async findAllByUser(userId) {
    return await this.prisma.bookmark.findMany({
      where: { userId },
      include: {
        blog: {
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
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.bookmark.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateBookmarkDto) {
    return await this.prisma.bookmark.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.bookmark.delete({ where: { id } });
  }
}
