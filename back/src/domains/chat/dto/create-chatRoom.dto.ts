import { ApiProperty } from "@nestjs/swagger";

export class CreateChatRoomDto {
    @ApiProperty()
    name:string
}
