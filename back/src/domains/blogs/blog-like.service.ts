import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateBlogLikeDto } from './dto/create-blog-like.dto';
import { UpdateBlogLikeDto } from './dto/update-blog-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BlogLikesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBlogLikeDto) {
  
    return await this.prisma.blogLike.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.blogLike.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.blogLike.findFirst({
        where: {
            id,
        },
    });
  
  }

 
async update(id: string, dto: UpdateBlogLikeDto) {
  return await this.prisma.blogLike.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.blogLike.delete({ where: { id } });
    }
}
