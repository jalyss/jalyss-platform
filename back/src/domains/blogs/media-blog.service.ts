import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateMediaBlogDto } from './dto/create-media-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMediaBlogDto } from './dto/update-media-blog.dto';


@Injectable()
export class MediaBlogService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateMediaBlogDto) {
  
    return await this.prisma.mediaBlog.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.mediaBlog.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.mediaBlog.findFirst({
        where: {
            id,
        },
    });
  
  }

 
async update(id: string, dto: UpdateMediaBlogDto) {
  return await this.prisma.mediaBlog.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.mediaBlog.delete({ where: { id } });
    }
}
