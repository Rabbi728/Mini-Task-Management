import { Module } from '@nestjs/common';
import { ActivityLogsController } from './activity_logs.controller';
import { ActivityLogsService } from './activity_logs.service';

@Module({
    controllers: [ActivityLogsController],
    providers: [ActivityLogsService],
    exports: [ActivityLogsService]
})
export class ActivityLogsModule {}
