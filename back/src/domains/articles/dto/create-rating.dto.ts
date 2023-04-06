import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingDto {
   
    @ApiProperty()
    commit: string
    @ApiProperty()
    rate: number
}