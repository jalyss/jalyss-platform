import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleByBranchDto {

  @ApiProperty({ required: true })
  branchId: string;
  @ApiProperty({ required: false })
  articleId: string;
  @ApiProperty({ required: false })
  price: number;
  @ApiProperty({ required: false })
  stock: number;
  
}
