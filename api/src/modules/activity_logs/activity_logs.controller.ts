import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ActivityLogsService } from './activity_logs.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Controller('activity-logs')
export class ActivityLogsController {
    constructor(private readonly activityLogsService: ActivityLogsService) { }

    @Get()
    async getAll() {
        return await this.activityLogsService.all();
    }

    @Post()
    async create(@Body() body: CreateActivityLogDto) {
        return await this.activityLogsService.create(body);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.activityLogsService.findById(+id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateActivityLogDto) {
        return await this.activityLogsService.update(+id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.activityLogsService.delete(+id);
    }
}
