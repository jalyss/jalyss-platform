import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    const {articles,...rest}=dto
    console.log(dto);
     return await this.prisma.$transaction(async (prisma) => {
      const mvt = await prisma.transaction.create({
        data: {
          ...rest,
          date: new Date(dto.date).toISOString(),
          mvtArticle: {
            create: articles.map((article) => ({
              articleId: article.articleId,
              quantity:article.quantity
            })),
          },
        },
        include: { mvtArticle: { include: { article:{include:{ArticlesByBranch:true}}} } },
      });
      if (dto.status === 'delivered') {
        await Promise.all(
          dto.articles.map(async (article) => {
            let articlesBranchSender = await prisma.articlesByBranch.findUnique(
              {
                where: {
                  branchId_articleId: {
                    branchId: dto.branchSenderId,
                    articleId: article.articleId,
                  },
                },
              },
            );
            if (!articlesBranchSender) {
              articlesBranchSender = await prisma.articlesByBranch.create({
                data: {
                  branchId: dto.branchSenderId,
                  articleId: article.articleId,
                  stock: 0,
                  price: 0,
                },
              });
            }
            let stockBranchSender =
              articlesBranchSender?.stock - article.quantity;
            let articlesBranchReceiver =
              await prisma.articlesByBranch.findUnique({
                where: {
                  branchId_articleId: {
                    branchId: dto.branchReceiverId,
                    articleId: article.articleId,
                  },
                },
              });
            if (!articlesBranchReceiver) {
              articlesBranchReceiver = await prisma.articlesByBranch.create({
                data: {
                  branchId: dto.branchReceiverId,
                  articleId: article.articleId,
                  stock: 0,
                  price: 0,
                },
              });
            }
            let stockBranchReceiver =
              articlesBranchReceiver?.stock + article.quantity;
            await prisma.articlesByBranch.update({
              where: { id: articlesBranchSender.id },
              data: { stock: stockBranchSender },
            });
            await prisma.articlesByBranch.update({
              where: { id: articlesBranchReceiver.id },
              data: { stock: stockBranchReceiver },
            });
          }),
        );
      }
      return mvt;
    });
  }

  findAll() {
    return this.prisma.transaction.findMany({
      include: { mvtArticle: { include: { article:{include:{ArticlesByBranch:true}} } } },
    });
  }

  async findOne(id: string) {
    return await this.prisma.transaction.findFirst({
      where: {
        id,
      },
      include: { mvtArticle: { include: {  article:{include:{ArticlesByBranch:true}}} } },
    });
  }

  async update(id: string, dto: UpdateTransactionDto) {
    // more work with update articles in transaction
   return await this.prisma.$transaction(async (prisma) => {
        const {date,articles,...rest}=dto
      const transaction = await prisma.transaction.update({
        where: { id },
        data: { ...rest},
        include: { mvtArticle: { include: { article:{include:{ArticlesByBranch:true}}} } },
      });
      if (dto.status === 'delivered') {
        await Promise.all(
          transaction.mvtArticle.map(async (article) => {
            let articlesBranchSender = await prisma.articlesByBranch.findUnique(
              {
                where: {
                  branchId_articleId: {
                    branchId: transaction.branchSenderId,
                    articleId: article.articleId,
                  },
                },
              },
            );
            if (!articlesBranchSender) {
              articlesBranchSender = await prisma.articlesByBranch.create({
                data: {
                  branchId: transaction.branchSenderId,
                  articleId: article.articleId,
                  stock: 0,
                  price: 0,
                },
              });
            }
            let stockBranchSender =
              articlesBranchSender?.stock - article.quantity;
            let articlesBranchReceiver =
              await prisma.articlesByBranch.findUnique({
                where: {
                  branchId_articleId: {
                    branchId: transaction.branchReceiverId,
                    articleId: article.articleId,
                  },
                },
              });
            if (!articlesBranchReceiver) {
              articlesBranchReceiver = await prisma.articlesByBranch.create({
                data: {
                  branchId: transaction.branchReceiverId,
                  articleId: article.articleId,
                  stock: 0,
                  price: 0,
                },
              });
            }
            let stockBranchReceiver =
              articlesBranchReceiver?.stock + article.quantity;
            await prisma.articlesByBranch.update({
              where: { id: articlesBranchSender.id },
              data: { stock: stockBranchSender },
            });
            await prisma.articlesByBranch.update({
              where: { id: articlesBranchReceiver.id },
              data: { stock: stockBranchReceiver },
            });
          }),
        );
      }
      return await this.findOne(id);
    });
  }

  async remove(id: string) {
    return await this.prisma.transaction.delete({ where: { id } });
  }
}
