import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async all() {
        return await this.prismaService.tasks.findMany({
            include: {
                users_tasks_assigned_userTousers: true,
                users_tasks_created_byTousers: true
            }
        });
    }

    async findById(id: number) {
        return await this.prismaService.tasks.findFirst({
            where: { id },
            include: {
                users_tasks_assigned_userTousers: true,
                users_tasks_created_byTousers: true
            }
        });
    }

    async create(data: CreateTaskDto) {
        return await this.prismaService.tasks.create({
            data: {
                ...data,
                uuid: randomUUID(),
                created_at: new Date(),
                updated_at: new Date()
            }
        });
    }

    async update(id: number, data: UpdateTaskDto) {
        return await this.prismaService.tasks.update({
            where: { id },
            data: {
                ...data,
                updated_at: new Date()
            }
        });
    }

    async delete(id: number) {
        return await this.prismaService.tasks.delete({
            where: { id }
        });
    }
}
