import { DoctorScheduleDay } from "@/types/enums/doctorScheduleDay";


export interface UpdateDoctorScheduleDto {
    dayOfWeek?: DoctorScheduleDay;
    startTime?: string;
    endTime?: string;
}