import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateCommentBlogDto } from './dto/create-comment-blog.dto';
import { UpdateCommentBlogDto } from './dto/update-comment-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CommentBlogService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCommentBlogDto) {
  
    return await this.prisma.commentBlog.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.commentBlog.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.commentBlog.findFirst({
        where: {
            id,
        },
    });
  
  }

 
async update(id: string, dto: UpdateCommentBlogDto) {
  return await this.prisma.commentBlog.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.commentBlog.delete({ where: { id } });
    }
}
