import { Injectable, Inject, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/common/prisma.service'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';
import { getDhakaDate } from '@/common/utils';

@Injectable()
export class UserService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async all() {
        return await this.prismaService.users.findMany({
            orderBy: { id: 'desc' }
        });
    }

    async findById(id: number) {
        return await this.prismaService.users.findFirst({
            where: { id }
        })
    }

    async findByUuid(uuid: string) {
        return await this.prismaService.users.findFirst({
            where: { uuid }
        })
    }

    async findByEmail(email: string) {
        return await this.prismaService.users.findFirst({
            where: { email }
        })
    }

    async create(data: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);

        return await this.prismaService.users.create({
            data: {
                ...data,
                password: hashedPassword,
                uuid: randomUUID(),
                created_at: getDhakaDate(),
                updated_at: getDhakaDate()
            }
        });
    }

    async update(uuid: string, data: UpdateUserDto) {
        const updateData: any = {
            ...data,
            updated_at: getDhakaDate()
        };

        if (data.password) {
            const salt = await bcrypt.genSalt();
            updateData.password = await bcrypt.hash(data.password, salt);
        }

        return await this.prismaService.users.update({
            where: { uuid },
            data: updateData
        });
    }

    async delete(uuid: string) {
        return await this.prismaService.users.delete({
            where: { uuid }
        });
    }
}


