import {
    Entity,
    Unique,
    Generated,
    Column,
    CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

@Unique(['uuid'])
@Entity()
export class Audio {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    file: string;

    @Column({ default: 0 })
    category: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(name: string, file: string, category: number) {
        this.name = name;
        this.file = file;
        this.category = category;
    }
}
