import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { TaskStatus } from '../tasks/dto/create-task.dto';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) {}

    async getStats() {
        const [
            totalUsers,
            totalTasks,
            pendingTasks,
            inProgressTasks,
            doneTasks,
            cancelledTasks,
            recentLogs
        ] = await Promise.all([
            this.prisma.users.count(),
            this.prisma.tasks.count(),
            this.prisma.tasks.count({ where: { status: TaskStatus.PENDING } }),
            this.prisma.tasks.count({ where: { status: TaskStatus.IN_PROGRESS } }),
            this.prisma.tasks.count({ where: { status: TaskStatus.DONE } }),
            this.prisma.tasks.count({ where: { status: TaskStatus.CANCELLED } }),
            this.prisma.activity_logs.findMany({
                take: 5,
                orderBy: { created_at: 'desc' },
                include: { users: true }
            })
        ]);

        return {
            users: {
                total: totalUsers,
            },
            tasks: {
                total: totalTasks,
                pending: pendingTasks,
                in_progress: inProgressTasks,
                done: doneTasks,
                cancelled: cancelledTasks,
            },
            recent_activity: recentLogs
        };
    }

    async getMyStats(userId: number) {
        const [
            totalTasks,
            pendingTasks,
            inProgressTasks,
            doneTasks,
            cancelledTasks
        ] = await Promise.all([
            this.prisma.tasks.count({ where: { assigned_user: userId } }),
            this.prisma.tasks.count({ where: { assigned_user: userId, status: TaskStatus.PENDING } }),
            this.prisma.tasks.count({ where: { assigned_user: userId, status: TaskStatus.IN_PROGRESS } }),
            this.prisma.tasks.count({ where: { assigned_user: userId, status: TaskStatus.DONE } }),
            this.prisma.tasks.count({ where: { assigned_user: userId, status: TaskStatus.CANCELLED } }),
        ]);

        return {
            tasks: {
                total: totalTasks,
                pending: pendingTasks,
                in_progress: inProgressTasks,
                done: doneTasks,
                cancelled: cancelledTasks,
            }
        };
    }
}
