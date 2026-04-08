import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { TasksModule } from '@/modules/tasks/tasks.module';
import { ActivityLogsModule } from '@/modules/activity_logs/activity_logs.module';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [UserModule, AuthModule, TasksModule, ActivityLogsModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
