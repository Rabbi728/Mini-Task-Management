import { Global, Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [TimeService, PrismaService],
    exports: [TimeService, PrismaService],
    imports: []
})
export class CommonModule { }