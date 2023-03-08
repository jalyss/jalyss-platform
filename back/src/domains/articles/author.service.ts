import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";



@Injectable()
export class authorService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(dto: CreateAuthorDto) {
        return await this.prisma.author.create({
            data: {
                ...dto,
            },
        });
    }

    findAll() {
        return this.prisma.author.findMany();
    }

    async findOne(id: string) {
        return await this.prisma.author.findFirst({
            where: {
                id,
            },
        });

    }

    async update(id: string, dto: UpdateAuthorDto) {
        return await this.prisma.author.update({ where: { id }, data: dto });
    }

    async remove(id: string) {
        return await this.prisma.author.delete({ where: { id } });
    }



}