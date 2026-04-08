import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthGuard } from "@/common/auth.guard";
import { UseGuards } from '@nestjs/common';
import express from 'express';
import { PersonalAccessTokensService } from '@/modules/auth/service/personal-access-tokens.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly personalAccessTokensService: PersonalAccessTokensService,
    ) { }

    @Post('login')
    async login(@Body() body: LoginDto) {
        const result = await this.authService.userLogin(body.email, body.password);
        return { ...result, message: 'Login successful' };
    }

    @Get('me')
    @UseGuards(AuthGuard)
    async me(@Req() req: any) {
        const user = await this.userService.findById(req['user_token'].user_id);
        return user;
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    async logout(@Req() req: any) {
        await this.personalAccessTokensService.deleteToken(req['user_token'].id);
        return {
            status: 'success',
            message: 'Logout successfully',
        };
    }
}
