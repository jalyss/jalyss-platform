import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto"; 



@Injectable()
export class countriesService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(dto: CreateCountryDto) {
        return await this.prisma.country.create({
            data: {
                ...dto,
            },
        });
    }

    findAll() {
        return this.prisma.country.findMany();
    }

    async findOne(id: string) {
        return await this.prisma.country.findFirst({
            where: {
                id,
            },
        });

    }

    async update(id: string, dto: UpdateCountryDto) {
        return await this.prisma.country.update({ where: { id }, data: dto });
    }

    async remove(id: string) {
        return await this.prisma.country.delete({ where: { id } });
    }



}