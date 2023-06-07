import { Injectable } from '@nestjs/common';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';
import { UpdateChatDto } from './dto/update-chatRoom.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ChatRoomService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateChatRoomDto,senderId:string) {
   return await this.prisma.chatRoom.create({
      data: {
        name: dto.name,
        participants: {
          create: [
            {
              userId: senderId,
            },
            {
              userId: dto.receiverId,
            },
          ],
        },
        messages:{create:{
          text:dto.text,
          userId:senderId
        }}
      },
      include:{
        participants:true,
        messages:true
      }
    });
    
  }

  async findAll(id:string) {
    const rooms = await this.prisma.chatRoom.findMany({
      where : {
        participants :{
          some : {
            userId : id
          }
        }
      },
      include: {
        participants: { include: { user: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    }
     
    );
    const sortedRooms = rooms.sort(
      (a, b) =>
        b.messages[0].createdAt.getTime() - a.messages[0].createdAt.getTime(),
    );
    return sortedRooms
  }



  async findOne(id: string) {
    return await this.prisma.chatRoom.findUnique({
      where: { id },
      include: { messages: true , participants: {
        include: { user : true }  
      }},
    });
  }
 

  async update(id: string, dto: UpdateChatDto) {
    return await this.prisma.chatRoom.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.chatRoom.delete({ where: { id } });
  }
}
