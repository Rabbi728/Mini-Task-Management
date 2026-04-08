import { Controller, Get, Post, Body, Put, Param, Delete, Query, Patch } from '@nestjs/common';
import type { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@/common/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async getAll() {
        return await this.tasksService.all();
    }

    @Post()
    async create(@Body() body: CreateTaskDto, @Req() req: Request) {
        return await this.tasksService.create(body, req['user_token'].user_id);
    }

    @Get('my-tasks')
    async getMyTasks(@Req() req: Request) {
        return await this.tasksService.myTasks(req['user_token'].user_id);
    }

    @Get(':uuid')
    async getById(@Param('uuid') uuid: string) {
        return await this.tasksService.findByUuid(uuid);
    }

    @Put(':uuid')
    async update(@Param('uuid') uuid: string, @Body() body: UpdateTaskDto, @Req() req: Request) {
        return await this.tasksService.update(uuid, body, req['user_token'].user_id);
    }

    @Delete(':uuid')
    async delete(@Param('uuid') uuid: string, @Req() req: Request) {
        return await this.tasksService.delete(uuid, req['user_token'].user_id);
    }

    @Patch(':uuid/status')
    async updateStatus(@Param('uuid') uuid: string, @Body('status') status: TaskStatus, @Req() req: Request) {
        return await this.tasksService.updateStatus(uuid, status, req['user_token'].user_id);
    }
}
