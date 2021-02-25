import {IsInt, IsOptional} from 'class-validator';
import {Transform} from "class-transformer";


export class AudioCreateDto {
    @IsOptional()
    name: string;

    @IsOptional()
    @IsInt()
    @Transform(value => Number(value))
    category: number;
}