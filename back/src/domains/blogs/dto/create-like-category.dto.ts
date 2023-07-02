import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeCategoryDto {
    @ApiProperty()
    type :string
}