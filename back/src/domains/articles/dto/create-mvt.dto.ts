import { ApiProperty } from "@nestjs/swagger";
import { StatusMvt } from "@prisma/client";

export class CreateMvtArticleDto {

    @ApiProperty({ required: true })
    branchSenderId: string;
    @ApiProperty({ required: true })
    branchReceiverId: string;
    @ApiProperty({ required: false })
    articleId: string;
    @ApiProperty({ required: false })
    date: string;
    @ApiProperty({ required: false })
    status: StatusMvt;
    @ApiProperty({ required: false })
    quantity: number;
}

