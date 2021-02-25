import {IsInt, IsNotEmpty} from 'class-validator';
import {Transform} from "class-transformer";

export class AudioUpdateDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Transform(value => Number(value))
    @IsInt()
    category: number;
}