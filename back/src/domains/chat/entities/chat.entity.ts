import { CreateChatRoomDto } from "../dto/create-chatRoom.dto";
import { CreateConnectedUsersDto } from "../dto/create-connectedUsers.dto";
import { CreateMessageDto } from "../dto/create-message.dto";


export class MessageSocketio extends CreateMessageDto {

userId: string ;

chatRoomId : string 
    

}

export class ChatRoomSocketio extends CreateChatRoomDto {

 senderId   : string;
     
}


export class ConnectedUsersio extends CreateConnectedUsersDto {
    userId:string
}
