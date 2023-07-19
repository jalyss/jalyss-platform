import { Injectable } from '@nestjs/common';
import { CreateChatRoomDto, CreateChatRoomGroupDto } from './dto/create-chatRoom.dto';
import { UpdateChatDto } from './dto/update-chatRoom.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatRoomService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateChatRoomDto, senderId: string) {
    return await this.prisma.chatRoom.create({
      data: {
        name: dto.name,
        participants: {
          create: [
            {
              userId: senderId,
            },
            { userId: dto.receiverId },
          ],
        },
        messages: {
          create: {
            text: dto.text,
            userId: senderId,
          },
        },
      },
      include: {
        participants: true,
        messages: true,
      },
    });
  }

  
  async findAll(id: string) {
    const rooms = await this.prisma.chatRoom.findMany({
      where: {
        participants: {
          some: {
            userId: id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              include: {
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            messages: { where: { seen: false, userId: { not: id } } },
          },
        },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    const sortedRooms = rooms.sort(
      (a, b) =>
        b.messages[0].createdAt.getTime() - a.messages[0].createdAt.getTime(),
    );
    return sortedRooms;
  }

  async findOne(id: string) {
    return await this.prisma.chatRoom.findUnique({
      where: { id },
      include: {
        messages: true,
        participants: {
          include: {
            user: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  findAllRoomsGroup() {
    return this.prisma.chatRoom.findMany({
      where:{
        isGroup:true
      },
      include: {
        messages: true,
        participants: {
          include: {
            user: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async findUsersChatroom(userId1: string, userId2: string) {
    const chatRoom = await this.prisma.chatRoom.findFirstOrThrow({
      where: {
        participants: {
          every: {
            userId: {
              in: [userId1, userId2],
            },
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              include: {
                avatar: true,
              },
            },
          },
        },
        messages: true,
      },
    });

    return chatRoom;
  }

  async update(id: string, dto: UpdateChatDto) {
    let chatRoom = await this.findOne(id);
    return await this.prisma.$transaction(async (prisma) => {
      for (let i = 0; i < chatRoom.participants.length; i++) {
        let response = false;
        for (let j = 0; j < dto.participants.length; j++) {
          if (dto.participants[j].value === chatRoom.participants[i].userId)
            response = true;
        }
        if (!response ) {
          await prisma.userChatRoom.delete({
            where: {
              joinerRoom: {
                chatRoomId: id,
                userId: chatRoom.participants[i].userId,
              },
            },
          });
        }
      }

      return await prisma.chatRoom.update({
        where: { id },
        include:{participants:true},
        data: {
          name: dto.name,
          participants: {
            connectOrCreate: dto.participants.map((participant) => ({
              where: {
                joinerRoom: { chatRoomId: id, userId: participant.value },
              },
              create: {
                userId: participant.value,
              },
            })),
          },
        },
      });
    });
  }
  async createChatRoomGroup(dto:CreateChatRoomGroupDto){
    return await this.prisma.chatRoom.create({
      data: {
        name: dto.name,
        isGroup:true,
        participants: {
          create: dto.participants.map(participant=>({userId:participant.value}))
        },
        messages:{
          create:dto.participants.map(participant=>({userId:participant.value,text:'hi'}))
        }
        
      },
      include: {
        participants: true,
        messages: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.chatRoom.delete({ where: { id } });
  }
}
