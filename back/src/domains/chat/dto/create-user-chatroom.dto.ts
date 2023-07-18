import { ApiProperty } from "@nestjs/swagger";


export class CreateUserChatroomDto {
    @ApiProperty()
    userId:string
    @ApiProperty()
    chatRoomId:string
}
