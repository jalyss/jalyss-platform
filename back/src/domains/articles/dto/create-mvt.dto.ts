import { ApiProperty } from '@nestjs/swagger';
import { StatusMvt } from '@prisma/client';

export class CreateMvtArticleDto {
  @ApiProperty({ required: false })
  articleId: string;

  @ApiProperty({ required: false })
  transactionId: string;
  @ApiProperty({ required: false })
  quantity: number;
}
