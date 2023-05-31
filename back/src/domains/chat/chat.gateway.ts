import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, 
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UsersService } from '../users/users.service';
import { MessagesService } from './messages.service';
import { ChatRoomService } from './chatRoom.service';

import { ChatMessage } from '@prisma/client';
import {
  ChatRoomSocketio,
  MessageSocketio,
  ConnectedUsersio,
} from './entities/chat.entity';
import { ConnectedUsersService } from './connectedUsers.service';
import { CreateConnectedUserDto } from './dto/create-connectedUsers.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  
{
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly UserService: UsersService,
    private readonly MessageService: MessagesService,
    private readonly ChatRoomService: ChatRoomService,
    private readonly ConnectedUsersService: ConnectedUsersService,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  //! Send messages

  @SubscribeMessage('connection')
  async connect(client: Socket, payload: CreateConnectedUserDto) {

   let connectedUser=await this.PrismaService.connectedUser.findFirst({where:{userId:payload.userId}})
   if(!connectedUser)
   await this.PrismaService.connectedUser.create({data:{userId:payload.userId}})
   
   await this.connectedUsersList()
   setTimeout(() =>{this.disconnect(payload.userId)},1000*60*2)

  }
  @SubscribeMessage('online-users')
  async onlineUsers(client: Socket,id:string){
    let connectedUserList= await this.PrismaService.connectedUser.findMany({
      include:{
        user:{
          select:{
            fullNameAr:true,fullNameEn:true,avatar:true
          }
        }
      }
    })
    this.server.emit(`connected-users/${id}`, connectedUserList);
  }

  async disconnect(id: string) {
    let connectedUser=await this.PrismaService.connectedUser.findFirst({where:{userId:id}})
   if(connectedUser)
    await this.PrismaService.connectedUser.delete({where:{userId:id}})
    this.server.emit(`disconnect/${id}`)
    await this.connectedUsersList()
  }

private async connectedUsersList(){
  let connectedUserList= await this.PrismaService.connectedUser.findMany({
    include:{
      user:{
        select:{
          fullNameAr:true,fullNameEn:true,avatar:true,id:true
        }
      }
    }
  })
  
  for (let user of connectedUserList) {
    this.server.emit(`connected-users/${user.userId}`, connectedUserList);
  }
}


  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: MessageSocketio) {
    const { userId, chatRoomId, ...rest } = payload;
    const response = await this.MessageService.create(rest, userId, chatRoomId);

    this.server.emit(`msgToClient/${chatRoomId}`, response);
  }

  //! create chatroom

  @SubscribeMessage('create-chat-room')
  async createChatRoom(client: Socket, payload: ChatRoomSocketio) {
    console.log('Received', payload);

    const { senderId, ...rest } = payload;
    const response = await this.ChatRoomService.create(rest, senderId);
    response.participants.forEach(async (e) => {
      const rooms = await this.PrismaService.chatRoom.findMany({
        where: {
          participants: {
            some: {
              userId: e.userId,
            },
          },
        },
        include: {
          participants: { include: { user: true } },
          messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
      });
      const sortedRooms = rooms.sort(
        (a, b) =>
          b.messages[0].createdAt.getTime() - a.messages[0].createdAt.getTime(),
      );
      console.log(sortedRooms);

      this.server.emit(`chat-room/${e.userId}`, sortedRooms);
    });
  }

  
}
