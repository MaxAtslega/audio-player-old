import { IsNotEmpty } from 'class-validator';

export class KeyDto {
    @IsNotEmpty()
    key: string;
}