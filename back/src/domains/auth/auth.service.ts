import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FormatLogin, UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

import { JwtPayload } from "./jwt.strategy";

import { User } from '@prisma/client'
import { hash } from "bcrypt";
import { CreateUserDto } from 'src/domains/users/dto/create-user.dto';
import { UserLogin } from 'src/domains/users/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }
    async register(userDto: CreateUserDto):
        Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: "ACCOUNT_CREATE_SUCCESS",
        };

        try {
            status.data = await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }

    async login(loginUserDto: UserLogin): Promise<any> {
        // find user in db
        const user = await
            this.usersService.findByLogin(loginUserDto);
        console.log(user, '============>');

        // generate and sign token
        const token = this._createToken(user);

        return token
        // data: user

    }

    private _createToken(args: FormatLogin): any {
        const user: FormatLogin = args;
        const Authorization = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            Authorization,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException("INVALID_TOKEN",
                HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async me(token: string) {
        const payload = this.jwtService.decode(token, {}) as any;


        return new Promise((resolve, reject) => {
            resolve(payload);
        });
    }
}
export interface RegistrationStatus {
    success: boolean;
    message: string;
    data?: User;
}
export interface RegistrationSeederStatus {
    success: boolean;
    message: string;
    data?: User[];
}