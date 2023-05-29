import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
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

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleConnection(client: Socket, payload:ConnectedUsersio) {
    const {...rest} = payload;
    const response = await this.ConnectedUsersService.create(rest)
    console.log(`Connected ${client.id}`);
    this.server.emit(`connected-user/${rest}`, response);

  }

 async handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }




}
