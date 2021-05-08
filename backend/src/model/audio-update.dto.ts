import { IsInt, IsNotEmpty, IsString } from "class-validator";
import {Transform} from "class-transformer";

export class AudioUpdateDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    category: string;
}