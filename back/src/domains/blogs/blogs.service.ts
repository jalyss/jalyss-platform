import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(
    private readonly prisma:PrismaService
  ){}
  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  findAll() {
    return `This action returns all blogs`;
  }

  findOne(id: string) {
    return `This action returns a #${id} blog`;
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: string) {
    return `This action removes a #${id} blog`;
  }
}
