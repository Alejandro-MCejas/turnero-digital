import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { AppointmentStatus } from "../../enums/AppointmentStatus"


export class UpdateAppointmentDto {

    @IsOptional()
    @IsDateString()
    date?: string

    @IsOptional()
    @IsNotEmpty()
    time?: string

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus
}