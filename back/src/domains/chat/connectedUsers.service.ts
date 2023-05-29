import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConnectedUsersDto } from './dto/create-connectedUsers.dto';



@Injectable() 
export class ConnectedUsersService {
    constructor(private readonly prisma: PrismaService) {}


async create(dto:CreateConnectedUsersDto) {
    return await this.prisma.connetedUser.create({
        data:dto
    })
}

async getUsers() {
    return await this.prisma.connetedUser.findMany({
       include:{user:true}
    })
}


async remove(userId:string){
    return await this.prisma.connetedUser.deleteMany({
        where : {
            userId:userId
        }
    })
}

}