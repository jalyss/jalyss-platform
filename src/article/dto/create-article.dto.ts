import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto {

    @ApiProperty({required:false})
    name:string
    @ApiProperty({required:false})
    cover:string
    @ApiProperty({required:false})
    wieght:Float32Array
    @ApiProperty({required:false})
    code:Int16Array
    @ApiProperty({required:true})
    categoryId:string
    @ApiProperty({required:true})
    publishingHouseId:string
    @ApiProperty({required:true})
    typeId:string
    @ApiProperty({required:true})
    Supply:any[]
    @ApiProperty({required:true})
    ArticleByBranch:any[]

}
