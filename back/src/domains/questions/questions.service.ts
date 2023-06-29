import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor ( private readonly prisma : PrismaService) {}
   async create(dto:CreateQuestionDto ) {
    return await this.prisma.frequentilyQuestion.create(
      {
        data : {
          ...dto
        }
      }
    )
  }

  async findAll() {
    return await this.prisma.frequentilyQuestion.findMany({
    })
  }

async  findOne(id: string) {
    return await this.prisma.frequentilyQuestion.findUnique({
      where : { id }
    })
  }

 async update(id: string, dto:UpdateQuestionDto ) {
    return await this.prisma.frequentilyQuestion.update({
      where : { id },
      data : dto
    })
  }

 async remove(id: string) {
    return await this.prisma.frequentilyQuestion.delete({where : {id}})
  }
}
