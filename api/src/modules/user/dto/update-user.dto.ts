import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}
