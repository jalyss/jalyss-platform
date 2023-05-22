import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateLikeDto) {
  
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

 
async update(id: string, dto: UpdateLikeDto) {
  return await this.prisma.blogLike.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.blogLike.delete({ where: { id } });
    }
}
