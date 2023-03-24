import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Get,
    Request,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    BadRequestException
} from '@nestjs/common';
import { AuthService, RegistrationSeederStatus, RegistrationStatus } from "./auth.service";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from 'src/domains/users/dto/create-user.dto';
import { UserLogin } from 'src/domains/users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto):
        Promise<RegistrationStatus> {
        const result: RegistrationStatus = await
            this.authService.register(createUserDto,);
        if (!result.success) {
            throw new HttpException(result.message,
                HttpStatus.BAD_REQUEST);
        }
        return result;
    }


    @Post('login')
    public async login(@Body() loginUserDto: UserLogin):
        Promise<any> {
        return await this.authService.login(loginUserDto);
    }

    @ApiSecurity('apiKey')
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Request() req) {
        try {
            if (!req.get('Authorization')) {
                throw new Error('Missing Authorization header');
            }
            return await this.authService.me(
                req.get('Authorization').replace('Bearer ', ''),
            );
        } catch (e) {
            console.log('error', e);
            throw new BadRequestException(e.message);
        }
    }

    @Post('forget-password')
    forgetPassword(@Body() body: any) {
        return this.authService.forgetPassword(body.email)

    }

}