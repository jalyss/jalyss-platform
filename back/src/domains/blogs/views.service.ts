import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateViewsDto } from './dto/create-views.dto';
import { UpdateViewsDto } from './dto/update-views.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ViewsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateViewsDto) {
  
    return await this.prisma.view.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.view.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.view.findFirst({
        where: {
            id,
        },
    });
  
  }

 
async update(id: string, dto: UpdateViewsDto) {
  return await this.prisma.view.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return await this.prisma.view.delete({ where: { id } });
    }
}
