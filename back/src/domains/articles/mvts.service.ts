import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMvtArticleDto } from './dto/create-mvt.dto';
import { UpdateMvtArticleDto } from './dto/update-mvt.dto';

@Injectable()
export class MvtsService {
  constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateMvtArticleDto) {
        console.log(dto)
        const mvt = await this.prisma.mvtArticle.create({
            data: {
                ...dto,
                
            },
        });
        
        // if (dto.status === 'delivered') {

        //     let articlesBranchSender = await this.prisma.articlesByBranch.findUnique({
        //         where: {
        //             branchId_articleId: {
        //                 branchId: dto.branchSenderId, articleId: dto.articleId
        //             }
        //         }
        //     })
        //     if (!articlesBranchSender) {
        //         articlesBranchSender = await this.prisma.articlesByBranch.create({
        //             data: {
        //                 branchId: dto.branchSenderId, articleId: dto.articleId, stock: 0, price: 0
        //             }
        //         })

        //     }
        //     let stockBranchSender = articlesBranchSender?.stock - dto.quantity
        //     let articlesBranchReceiver = await this.prisma.articlesByBranch.findUnique({
        //         where: {
        //             branchId_articleId: {
        //                 branchId: dto.branchReceiverId, articleId: dto.articleId
        //             }
        //         }
        //     })
        //     if (!articlesBranchReceiver) {
        //         articlesBranchReceiver = await this.prisma.articlesByBranch.create({
        //             data: {
        //                 branchId: dto.branchReceiverId, articleId: dto.articleId, stock: 0, price: 0
        //             }
        //         })
        //     }
        //     let stockBranchReceiver = articlesBranchReceiver?.stock + dto.quantity
        //     await this.prisma.articlesByBranch.update({ where: { id: articlesBranchSender.id }, data: { stock: stockBranchSender } })
        //     await this.prisma.articlesByBranch.update({ where: { id: articlesBranchReceiver.id }, data: { stock: stockBranchReceiver } })
        // }
        return mvt
    }

    findAll() {
        return this.prisma.mvtArticle.findMany();
    }

    // async findOne(id: string) {
    //     return await this.prisma.mvtArticle.findFirst({
    //         where: {
    //             id,
    //         },
    //     });

    // }

    // async update(id: string, dto: UpdateMvtArticleDto) {
    //     const mvt = await this.prisma.mvtArticle.update({ where: { id }, data: { ...dto, date: new Date(dto.date).toISOString() } });
    //     if (dto.status === 'delivered') {

    //         const articlesBranchSender = await this.prisma.articlesByBranch.findUnique({
    //             where: {
    //                 branchId_articleId: {
    //                     branchId: dto.branchSenderId, articleId: dto.articleId
    //                 }
    //             }
    //         })
    //         let stockBranchSender = articlesBranchSender.stock - dto.quantity
    //         const articlesBranchReceiver = await this.prisma.articlesByBranch.findUnique({
    //             where: {
    //                 branchId_articleId: {
    //                     branchId: dto.branchReceiverId, articleId: dto.articleId
    //                 }
    //             }
    //         })
    //         let stockBranchReceiver = articlesBranchReceiver.stock + dto.quantity
    //         await this.prisma.articlesByBranch.update({ where: { id: articlesBranchSender.id }, data: { stock: stockBranchSender } })
    //         await this.prisma.articlesByBranch.update({ where: { id: articlesBranchReceiver.id }, data: { stock: stockBranchReceiver } })
    //     }
    //     return mvt
    // }

    // async remove(id: string) {
    //     return await this.prisma.mvtArticle.delete({ where: { id } });
    // }



}
