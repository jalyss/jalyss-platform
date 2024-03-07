import { ApiProperty } from '@nestjs/swagger';
import { MvtArticle, StatusMvt } from '@prisma/client';
import { IsString } from 'class-validator';
class SubSub{
  @ApiProperty()
  articleId: string
  @ApiProperty()
  quantity: number
} 
export class CreateTransactionDto {
  @IsString()
  @ApiProperty({ required: false })
  branchSenderId: string;
  @ApiProperty({ required: false })
  branchReceiverId: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  reason: string;
  @ApiProperty()
  status: StatusMvt;
  @ApiProperty({ required: false,type:[SubSub]})
  articles: MvtArticle[];
}

