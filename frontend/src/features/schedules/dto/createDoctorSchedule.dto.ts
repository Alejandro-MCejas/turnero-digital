import { DoctorScheduleDay } from "@/types/enums/doctorScheduleDay";


export interface CreateDoctorScheduleDto {
    dayOfWeek: DoctorScheduleDay;
    startTime: string;
    endTime: string;
}