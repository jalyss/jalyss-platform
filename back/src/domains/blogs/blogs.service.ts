import { Injectable ,HttpException,HttpStatus} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterBlog, FilterBlogExample } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBlogDto) {
  
    return await this.prisma.blog.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.blog.findMany({});
  }

  async findAllWithFilter(filters: FilterBlog) {
    let where = {confirm:true};
    let errors=[]
    Object.entries(filters).forEach(([key, value]) => {
      let filterExample=Object.keys(FilterBlogExample)
        if(filterExample.includes(key)){
          if (['userId','categoryId'].includes(key)) {
            where = { ...where, [key]: { in: value } }; //type of value is array
          }
          else where={...where,[key]:value} // type of value is string
        }else{
          errors.push(key)
        }
    });
    if(errors.length>0){
      let string=''
      errors.forEach(e=>{
        string=string+e+' '
      })
      console.log(string);
      
      // throw new Error(`${string} not matched for filters`)
      throw new HttpException(`${string} not matched for filters`,HttpStatus.BAD_REQUEST)
    }
    return await this.prisma.blog.findMany({
      where,
    });
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
