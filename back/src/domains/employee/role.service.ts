import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Prisma } from "@prisma/client";



@Injectable()
export class RoleService {
    
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(dto: CreateRoleDto) {
        return await this.prisma.role.create({
            data: {
                ...dto, permissions:dto.permissions as Prisma.JsonArray
            },
        });
    }

    findAll() {
        return this.prisma.role.findMany();
    }

    async findOne(id: string) {
        return await this.prisma.role.findFirst({
            where: {
                id,
            },
        });

    }

    async update(id: string, dto: UpdateRoleDto) {
        return await this.prisma.role.update({ where: { id }, data: dto });
    }

    async remove(id: string) {
        return await this.prisma.role.delete({ where: { id } });
    }



}