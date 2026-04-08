import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async getAll() {
        return await this.tasksService.all();
    }

    @Post()
    async create(@Body() body: CreateTaskDto) {
        return await this.tasksService.create(body);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.tasksService.findById(+id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
        return await this.tasksService.update(+id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.tasksService.delete(+id);
    }
}
