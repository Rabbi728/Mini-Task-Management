import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import 'dotenv/config';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const getDhakaDate = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const dhakaTime = new Date(utc + (360 * 60000));
    return dhakaTime;
};

async function main() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('password123', salt);
    const date = getDhakaDate();

    console.log('🌱 Start seeding...');

    // 1. Seed Users
    const admin = await prisma.users.upsert({
        where: { email: 'admin@test.com' },
        update: {},
        create: {
            uuid: randomUUID(),
            email: 'admin@test.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'admin',
            created_at: date,
            updated_at: date,
        },
    });

    const user1 = await prisma.users.upsert({
        where: { email: 'user1@test.com' },
        update: {},
        create: {
            uuid: randomUUID(),
            email: 'user1@test.com',
            password: hashedPassword,
            name: 'Regular User 1',
            role: 'user',
            created_at: date,
            updated_at: date,
        },
    });

    const user2 = await prisma.users.upsert({
        where: { email: 'user2@test.com' },
        update: {},
        create: {
            uuid: randomUUID(),
            email: 'user2@test.com',
            password: hashedPassword,
            name: 'Regular User 2',
            role: 'user',
            created_at: date,
            updated_at: date,
        },
    });

    console.log('✅ Seeded successfully:');
    console.log('   - admin@test.com / password123');
    console.log('   - user1@test.com / password123');
    console.log('   - user2@test.com / password123');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });