import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { randomUUID } from 'crypto';
import { ActivityLogsService } from '../activity_logs/activity_logs.service';
import { getDhakaDate } from '@/common/utils';

@Injectable()
export class TasksService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly activityLogsService: ActivityLogsService,
    ) { }

    async all() {
        return await this.prismaService.tasks.findMany({
            include: {
                users_tasks_assigned_userTousers: true,
                users_tasks_created_byTousers: true
            },
            orderBy: { id: 'desc' }
        });
    }

    async myTasks(userId: number) {
        return await this.prismaService.tasks.findMany({
            where: { assigned_user: userId },
            include: {
                users_tasks_assigned_userTousers: true,
                users_tasks_created_byTousers: true
            },
            orderBy: { id: 'desc' }
        });
    }

    async findByUuid(uuid: string) {
        return await this.prismaService.tasks.findFirst({
            where: { uuid },
            include: {
                users_tasks_assigned_userTousers: true,
                users_tasks_created_byTousers: true
            }
        });
    }

    async create(data: CreateTaskDto, userId: number) {
        const task = await this.prismaService.tasks.create({
            data: {
                ...data,
                created_by: userId,
                uuid: randomUUID(),
                created_at: getDhakaDate(),
                updated_at: getDhakaDate()
            }
        });

        await this.activityLogsService.create({
            record_type: 'TASK',
            details: `Created task: ${task.title}`,
            created_by: userId
        });

        return task;
    }

    async update(uuid: string, data: UpdateTaskDto, userId: number) {
        const oldTask = await this.prismaService.tasks.findUnique({
            where: { uuid }
        });

        if (!oldTask) {
            throw new NotFoundException('Task not found');
        }

        const task = await this.prismaService.tasks.update({
            where: { uuid },
            data: {
                ...data,
                updated_at: getDhakaDate()
            }
        });

        await this.activityLogsService.create({
            record_type: 'TASK',
            details: `Updated task: ${task.title}`,
            created_by: userId
        });

        if (data.status && data.status !== oldTask.status) {
            await this.activityLogsService.create({
                record_type: 'TASK',
                details: `Changed status of task "${task.title}" from ${oldTask.status} to ${data.status}`,
                created_by: userId
            });
        }

        if (data.assigned_user !== undefined && data.assigned_user !== oldTask.assigned_user) {
            await this.activityLogsService.create({
                record_type: 'TASK',
                details: `Changed assignment of task "${task.title}" from user ID ${oldTask.assigned_user} to ${data.assigned_user}`,
                created_by: userId
            });
        }

        return task;
    }

    async delete(uuid: string, userId: number) {
        const task = await this.prismaService.tasks.delete({
            where: { uuid }
        });

        await this.activityLogsService.create({
            record_type: 'TASK',
            details: `Deleted task: ${task.title}`,
            created_by: userId
        });

        return task;
    }

    async updateStatus(uuid: string, status: TaskStatus, userId: number) {
        const oldTask = await this.prismaService.tasks.findFirst({
            where: { 
                uuid,
                assigned_user: userId
            }
        });

        if (!oldTask) {
            throw new NotFoundException('Task not found or not assigned to you');
        }

        const task = await this.prismaService.tasks.update({
            where: { uuid },
            data: {
                status,
                updated_at: getDhakaDate()
            }
        });

        await this.activityLogsService.create({
            record_type: 'TASK',
            details: `Changed status of task "${task.title}" from ${oldTask.status} to ${status}`,
            created_by: userId
        });

        return task;
    }
}
