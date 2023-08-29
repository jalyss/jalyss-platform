import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new service
  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: dto,
    });
  }

  // Find all services with workspace and tariff included
  async findAll() {
    return this.prisma.service.findMany({
      include: {
        workSpace: {
          include: {
            image: true,
            MediaWorkSpace: { include: { media: true } },
          },
        },
        tarif: true,
        cover: true,
      },
    });
  }
  
  // Find a service by ID with workspace and tariff included
  async findOne(id: string) {
    const service = await this.prisma.service.findFirstOrThrow({
      where: {
        OR: [{ id }, { identifier: id }],
      },
      include: {
        workSpace: { include: { image: true } },
        tarif: true,
        MediaService: { include: { media: true } },
        cover: true,
      },
    });

    // Throw a NotFoundException if the service is not found
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return service;
  }

  // Update a service by ID
  async update(id: string, dto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }
  async remove(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { workSpace: true, tarif: true },
    });
  
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
  
    const workSpaces = service.workSpace;
    const tarifs = service.tarif;
  
    if (workSpaces && workSpaces.length > 0) {
      for (const workSpace of workSpaces) {
        await this.prisma.mediaWorkSpace.deleteMany({
          where: { workspaceId: workSpace.id },
        });
        await this.prisma.workSpace.delete({ where: { id: workSpace.id } });
      }
    }
  
    if (tarifs && tarifs.length > 0) {
      for (const tariff of tarifs) {
        await this.prisma.booking.deleteMany({ where: { tarifId: tariff.id } });
        await this.prisma.tarif.delete({ where: { id: tariff.id } });
      }
    }
  
    await this.prisma.service.delete({ where: { id } });
  }

  async createImages(id: string, dto: string[]) {
    return await this.prisma.mediaService.createMany({
      data: dto.map((elem) => ({
        mediaId: elem,
        seviceId: id,
      })),
    });
  }
}  

