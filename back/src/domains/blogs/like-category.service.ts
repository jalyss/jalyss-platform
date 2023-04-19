import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateLikeCategoryDto } from './dto/create-like-category.dto';
import { UpdateLikeCategoryDto } from './dto/update-like-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class LikeCategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateLikeCategoryDto) {
  
    return await this.prisma.likeCategory.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.likeCategory.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.likeCategory.findFirst({
        where: {
            id,
        },
    });
  
  }

 
async update(id: string, dto: UpdateLikeCategoryDto) {
  return await this.prisma.likeCategory.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.likeCategory.delete({ where: { id } });
    }
}
