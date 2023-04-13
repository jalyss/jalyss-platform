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
        const roleData = {
          roleNameAr: dto.roleNameAr,
          roleNameEn: dto.roleNameEn,
          permissions: {
            set: dto.permissions.map((permission) => ({
              domain: permission.domain,
              action: permission.action,
            })),
          },
        };
        const role = await this.prisma.role.create({
          data: roleData,
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