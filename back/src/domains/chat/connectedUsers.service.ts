import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConnectedUserDto } from './dto/create-connectedUsers.dto';



@Injectable() 
export class ConnectedUsersService {
    constructor(private readonly prisma: PrismaService) {}


async create(dto:CreateConnectedUserDto) {
    return await this.prisma.connectedUser.create({
        data:dto,
    })
}

async getUsers() {
    return await this.prisma.connectedUser.findMany({
       include:{user:true}
    })
}


async remove(userId:string){
    return await this.prisma.connectedUser.deleteMany({
        where : {
            userId:userId
        }
    })
}

}