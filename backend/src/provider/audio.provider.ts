import { Connection } from 'typeorm';
import { Audio } from '../entity/audio.entity';

export const audioProvider = [
    {
        provide: 'AUDIO_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Audio),
        inject: ['DATABASE_CONNECTION'],
    },
];