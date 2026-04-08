import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ActivityLogsService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async all() {
        return await this.prismaService.activity_logs.findMany({
            include: {
                users: true
            }
        });
    }

    async findById(id: number) {
        return await this.prismaService.activity_logs.findFirst({
            where: { id },
            include: {
                users: true
            }
        });
    }

    async create(data: CreateActivityLogDto) {
        return await this.prismaService.activity_logs.create({
            data: {
                ...data,
                uuid: randomUUID(),
                created_at: new Date(),
                updated_at: new Date()
            }
        });
    }

    async update(id: number, data: UpdateActivityLogDto) {
        return await this.prismaService.activity_logs.update({
            where: { id },
            data: {
                ...data,
                updated_at: new Date()
            }
        });
    }

    async delete(id: number) {
        return await this.prismaService.activity_logs.delete({
            where: { id }
        });
    }
}
