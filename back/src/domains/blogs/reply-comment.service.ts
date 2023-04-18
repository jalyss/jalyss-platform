import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply-comment.dto';
import { UpdateReplyDto } from './dto/update-reply-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class RepliesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateReplyDto) {
  
    return await this.prisma.replyCommentBlog.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.replyCommentBlog.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.replyCommentBlog.findFirst({
        where: {
            id,
        },
    });
  
  }

 
async update(id: string, dto: UpdateReplyDto) {
  return await this.prisma.replyCommentBlog.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.replyCommentBlog.delete({ where: { id } });
    }
}
