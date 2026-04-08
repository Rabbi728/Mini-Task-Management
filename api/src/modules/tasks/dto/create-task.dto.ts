import { IsString, IsNotEmpty, IsInt, IsOptional, IsEnum } from "class-validator";

export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    CANCELLED = "CANCELLED"
}

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsOptional()
    assigned_user?: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsInt()
    @IsOptional()
    created_by?: number;
}
