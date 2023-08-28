import {
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
@Injectable()
@UseInterceptors(CacheInterceptor)
export class SearchEngineService {
  constructor(
    private readonly prisma: PrismaService, // private readonly cache: CacheService,
  ) {}
  async findAll(query: string) {
    console.log('qury', query);
    // const cachedData = await this.cache.get(query);
    // if (cachedData) {
    //   // Data found in cache, return it
    //   return cachedData;
    // }
    const articles = await this.prisma.article.findMany({
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
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          {
            publishingHouse: { name: { equals: query, mode: 'insensitive' } },
          },
          { category: { nameAr: { equals: query, mode: 'insensitive' } } },
          { category: { nameEn: { equals: query, mode: 'insensitive' } } },
        ],
      },
    });

    const orderBy = { createdAt: 'desc' };
    const blogs = await this.prisma.blog.findMany({
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
      orderBy: { createdAt: 'desc' },
      where: {
        // confirm: 'confirmed',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { fullNameEn: { equals: query, mode: 'insensitive' } } },
          { author: { fullNameAr: { equals: query, mode: 'insensitive' } } },

          { category: { nameAr: { equals: query, mode: 'insensitive' } } },
          { category: { nameEn: { equals: query, mode: 'insensitive' } } },
        ],
      },
    });
    const workSpaces = await this.prisma.workSpace.findMany({
      include: {
        image: true,
        MediaWorkSpace: {
          include: {
            media: true,
          },
        },
      },

      where: {
        name: { contains: query, mode: 'insensitive' },
      },
    });
    const sessions = await this.prisma.session.findMany({
      include: {
        tarifs: true,
        sessionType: true,
        lectures: true,
        category: true,
        cover: true,
      },
      orderBy: { createdAt: 'desc' },
      where: {
        OR: [
          { titleAr: { contains: query, mode: 'insensitive' } },
          { titleEn: { contains: query, mode: 'insensitive' } },
          { category: { nameEn: { equals: query, mode: 'insensitive' } } },
          { category: { nameAr: { equals: query, mode: 'insensitive' } } },
        ],
      },
    });
    // await this.cache.set(query, { articles, blogs, sessions, workSpaces });
    return { articles, blogs, sessions, workSpaces };
  }
}
