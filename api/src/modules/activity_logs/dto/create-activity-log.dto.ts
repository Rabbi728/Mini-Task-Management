import { IsString, IsNotEmpty, IsInt, IsOptional, MaxLength } from "class-validator";

export class CreateActivityLogDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    record_type: string;

    @IsString()
    @IsNotEmpty()
    details: string;

    @IsInt()
    @IsOptional()
    created_by?: number;
}
