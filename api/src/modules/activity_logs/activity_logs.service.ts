import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { randomUUID } from 'crypto';
import { getDhakaDate } from '@/common/utils';

@Injectable()
export class ActivityLogsService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async all() {
        return await this.prismaService.activity_logs.findMany({
            include: {
                users: true
            },
            orderBy: { id: 'desc' }
        });
    }

    async create(data: CreateActivityLogDto) {
        return await this.prismaService.activity_logs.create({
            data: {
                ...data,
                uuid: randomUUID(),
                created_at: getDhakaDate(),
                updated_at: getDhakaDate()
            }
        });
    }

}
