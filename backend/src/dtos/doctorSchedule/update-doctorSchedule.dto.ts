import { IsEnum, IsOptional, Matches } from "class-validator"
import { DoctorScheduleDay } from "../../enums/DoctorScheduleDay"


export class UpdateDoctorScheduleDto {

    @IsOptional()
    @IsEnum(DoctorScheduleDay)
    dayOfWeek?: DoctorScheduleDay

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "startTime must be in HH:mm format"
    })
    startTime?: string

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "endTime must be in HH:mm format"
    })
    endTime?: string
}