import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUUID, Length, ValidateIf } from "class-validator"
import { AppointmentStatus } from "../../enums/AppointmentStatus"



export class UpdateAppointmentDto {

    @IsOptional()
    @IsDateString()
    date?: Date

    @IsOptional()
    @IsNotEmpty()
    time?: string

    @IsOptional()
    @IsUUID()
    doctorId?: string

    @IsOptional()
    @IsUUID()
    userId?: string

    @ValidateIf((o) => !o.userId && o.guestName !== undefined)
    @IsNotEmpty()
    @Length(2, 50)
    guestName?: string

    @ValidateIf((o) => !o.userId && o.guestEmail !== undefined)
    @IsEmail()
    guestEmail?: string

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus
}