import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
    @ApiProperty()
    text:string
    @ApiProperty()
    userId:string
    @ApiProperty()
    chatRoomId:string
}