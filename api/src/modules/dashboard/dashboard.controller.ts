import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@/common/auth.guard';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('stats')
    async getStats() {
        return await this.dashboardService.getStats();
    }

    @Get('my-stats')
    async getMyStats(@Req() req: Request) {
        return await this.dashboardService.getMyStats(req['user_token'].user_id);
    }
}
