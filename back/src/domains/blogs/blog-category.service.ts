import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateBlogCategoryDto } from "./dto/create-blog-category.dto"
import { UpdateBlogCategoryDto } from "./dto/update-blog-category.dto"
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BlogsCategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBlogCategoryDto) {
  
    return await this.prisma.blogCategory.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.blogCategory.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.blogCategory.findFirst({
        where: {
            id,
        },
    });
  
  }

 
async update(id: string, dto: UpdateBlogCategoryDto) {
  return await this.prisma.blogCategory.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.blogCategory.delete({ where: { id } });
    }
}




