import { Controller, Get } from '@nestjs/common';
import { ActivityLogsService } from './activity_logs.service';

@Controller('activity-logs')
export class ActivityLogsController {
    constructor(private readonly activityLogsService: ActivityLogsService) { }

    @Get()
    async getAll() {
        return await this.activityLogsService.all();
    }

}
