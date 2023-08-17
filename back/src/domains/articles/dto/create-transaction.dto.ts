import { ApiProperty } from '@nestjs/swagger';
import { MvtArticle, StatusMvt } from '@prisma/client';

export class CreateTransactionDto {
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
  @ApiProperty({ required: false })
  articles: MvtArticle[];
}
