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
export class ChatGateway {
  private typingUsers: { [userId: string]: boolean } = {};
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly UserService: UsersService,
    private readonly MessageService: MessagesService,
    private readonly ChatRoomService: ChatRoomService,
    private readonly ConnectedUsersService: ConnectedUsersService,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('connection')
  async connect(client: Socket, payload: CreateConnectedUserDto) {
    let connectedUser = await this.PrismaService.connectedUser.findFirst({
      where: { userId: payload.userId },
    });
    if (!connectedUser) {
      await this.PrismaService.connectedUser.create({
        data: { userId: payload.userId },
      });
    }

    await this.connectedUsersList();

    this.server.emit('typingUsers', { typingUsers: this.typingUsers });
    setTimeout(() => {
      this.disconnect(payload.userId);
    }, 1000 * 60 * 2);
  }

  @SubscribeMessage('online-users')
  async onlineUsers(client: Socket, id: string) {
    let connectedUserList = await this.PrismaService.connectedUser.findMany({
      include: {
        user: {
          select: {
            fullNameAr: true,
            fullNameEn: true,
            avatar: true,
          },
        },
      },
    });
    this.server.emit(`connected-users/${id}`, connectedUserList);
  }

  private async disconnect(id: string) {
    let connectedUser = await this.PrismaService.connectedUser.findFirst({
      where: { userId: id },
    });
    if (connectedUser) {
      await this.PrismaService.connectedUser.delete({
        where: { userId: id },
      });
      delete this.typingUsers[id];
      this.server.emit('typing', { userId: id, isTyping: false });
    }
    this.server.emit(`disconnect/${id}`);
    await this.connectedUsersList();
  }

  private async connectedUsersList() {
    let connectedUserList = await this.PrismaService.connectedUser.findMany({
      include: {
        user: {
          select: {
            fullNameAr: true,
            fullNameEn: true,
            avatar: true,
            id: true,
          },
        },
      },
    });

    for (let user of connectedUserList) {
      this.server.emit(`connected-users/${user.userId}`, connectedUserList);
    }
  }

  @SubscribeMessage('typingState')
  handleTypingState(client: Socket, payload: { userId: string, isTyping: boolean }) {
    const { userId, isTyping } = payload;

    this.typingUsers[userId] = isTyping;
    console.log(userId);
    this.server.emit('typing', { userId, isTyping });
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: MessageSocketio) {
    const { userId, chatRoomId, ...rest } = payload;

    const isTyping = this.typingUsers[userId] || false;

    if (isTyping) {
      delete this.typingUsers[userId];
      this.server.emit('typing', { userId, isTyping: false });
    }

    const response = await this.MessageService.create(rest, userId, chatRoomId);
    this.server.emit(`msgToClient/${chatRoomId}`, response);
  }




  @SubscribeMessage('msgSeen')
  async handleSeenMessage(client : Socket , payload : { chatRoomId : string , messageId : string,userId: string} ) {
    const { chatRoomId, messageId, userId} = payload;
    await this.MessageService.MessageSeen(chatRoomId,userId);
    console.log(messageId,userId);
    this.server.to(chatRoomId).emit('msgSeen',{messageId,userId});
  }

  

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