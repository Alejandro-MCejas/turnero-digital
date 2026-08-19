import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateAppointmentDto {

    @IsDateString()
    date!: string;

    @IsNotEmpty()
    time!: string

    @IsUUID()
    doctorId!: string

    @IsOptional()
    @IsUUID()
    userId?: string
}