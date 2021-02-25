import { Audio } from '../entity/audio.entity';
import { createConnection } from 'typeorm';

export const databaseProvider = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            return await createConnection({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                entities: [Audio],
                synchronize: true,
            });
        },
    },
];