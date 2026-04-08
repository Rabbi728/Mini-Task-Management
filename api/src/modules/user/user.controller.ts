import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';

@Controller('users')
// @UseGuards(AdminAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll() {
        return await this.userService.all();
    }   

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body);
    }

    @Get(':uuid')
    async getByUuid(@Param('uuid') uuid: string) {
        return await this.userService.findByUuid(uuid);
    }

    @Put(':uuid')
    async update(@Param('uuid') uuid: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(uuid, body);
    }

    @Delete(':uuid')
    async delete(@Param('uuid') uuid: string) {
        return await this.userService.delete(uuid);
    }
}
