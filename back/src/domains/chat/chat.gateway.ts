import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

import { UsersService } from '../users/users.service';
import { MessagesService } from './messages.service';
import { ChatRoomService } from './chatRoom.service';

import { ChatRoomSocketio, MessageSocketio } from './entities/chat.entity';

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
    private readonly userService: UsersService,
    private readonly MessageService: MessagesService,
    private readonly ChatRoomService: ChatRoomService,
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

  @SubscribeMessage('is-typing')
  async handleTypingState(
    client: Socket,
    payload: { userId: string; chatRoomId: string },
  ) {
    const { userId, chatRoomId } = payload;
    const user = await this.userService.findOne(userId);

    this.server.emit(`typing/${chatRoomId}`, user);
    setTimeout(() => this.server.emit(`no-typing/${chatRoomId}`, user), 5000);
  }

  @SubscribeMessage('create-chat-room')
  async createChatRoom(client: Socket, payload: ChatRoomSocketio) {
    const { senderId, ...rest } = payload;

    const response = await this.ChatRoomService.create(rest, senderId);
    this.server.emit(`chat-room-created/${senderId}`, response);
    await this.chatRoomList(response.participants);
  }

  @SubscribeMessage('msg-to-server')
  async handleMessage(client: Socket, payload: MessageSocketio) {
    const { userId, chatRoomId, ...rest } = payload;

    const response = await this.MessageService.create(rest, userId, chatRoomId);
    

    this.server.emit(`msg-to-client/${chatRoomId}`, response);
    this.server.emit(`no-typing/${chatRoomId}`, { userId });
    const chatRoom = await this.ChatRoomService.findOne(chatRoomId);
    await this.chatRoomList(chatRoom.participants);
  }

  @SubscribeMessage('msg-seen')
  async handleSeenMessage(
    client: Socket,
    payload: { chatRoomId: string; userId: string; num: number },
  ) {
    const { chatRoomId, userId, num } = payload;
    

    await this.MessageService.MessageSeen(chatRoomId, userId);
    const chatRoom = await this.ChatRoomService.findOne(chatRoomId);
    await this.chatRoomList(chatRoom.participants);

    const messages = await this.MessageService.getChatRoomMessages(
      chatRoomId,
      num,
    );
    this.server.emit(`messages/${chatRoomId}`, messages);
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

  private async chatRoomList(participants: any) {
    await participants.forEach(async (e: any, i: number) => {
      const rooms = await this.ChatRoomService.findAll(e.userId);

      this.server.emit(`chat-rooms/${e.userId}`, rooms);
    });
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
}
