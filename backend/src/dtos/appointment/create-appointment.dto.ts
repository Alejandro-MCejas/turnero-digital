import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsUUID, Length, ValidateIf } from "class-validator";

export class CreateAppointmentDto {

    @IsDateString()
    date!: Date;

    @IsNotEmpty()
    time!: string

    @IsUUID()
    doctorId!: string

    @IsOptional()
    @IsUUID()
    userId?: string

    @IsOptional()
    @ValidateIf(o => !o.userId)
    @IsNotEmpty()
    @Length(2, 50)
    guestName?: string

    @IsOptional()
    @ValidateIf(o => !o.userId)
    @IsEmail()
    guestEmail?: string
}