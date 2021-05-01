import { IsInt, IsOptional, IsString } from "class-validator";
import {Transform} from "class-transformer";


export class AudioCreateDto {
    @IsOptional()
    name: string;

    @IsOptional()
    @IsString()
    category: string;
}