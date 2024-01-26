import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";

export class CreateRecordDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    material: string;

    @IsInt()
    @Min(1)
    @Type(() => Number) // transform plain object to class instance
    learningTime: number;

    @IsString()
    description: string;
}