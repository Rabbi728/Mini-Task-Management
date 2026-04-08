import { Injectable, Inject } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';
import { PrismaService } from '@/common/prisma.service';

@Injectable()
export class PersonalAccessTokensService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    generateTokenString(): string {
        return randomBytes(32).toString('hex')
    }

    hashToken(token: string): string {
        return createHash('sha256').update(token).digest('hex')
    }

    async createToken(userId: number) {
        const validityDays = parseInt(process.env.AUTH_TOKEN_VALIDITY || '1');
        const expiresAt = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000);
        const plainToken = this.generateTokenString();
        const tokenHash = this.hashToken(plainToken);

        await this.prismaService.personal_access_tokens.create({
            data: {
                user_id: userId,
                token: tokenHash,
                expires_at: expiresAt,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        return plainToken;
    }

    async verifyToken(plainToken: string) {
        const tokenHash = this.hashToken(plainToken)
        const tokenRow = await this.prismaService.personal_access_tokens.findFirst({
            where : {
                token : tokenHash
            }
        })
        if (!tokenRow) return null
        if (tokenRow.expires_at && new Date(tokenRow.expires_at) < new Date()) return null
        return tokenRow
    }

    async deleteToken(id: number) {
        return await this.prismaService.personal_access_tokens.delete({
            where: { id }
        });
    }
}
