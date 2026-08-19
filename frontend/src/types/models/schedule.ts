import { DoctorScheduleDay } from "../enums/doctorScheduleDay";


export interface Schedule {
    id: string;
    doctorId: string;
    dayOfWeek: DoctorScheduleDay;
    startTime: string;
    endTime: string;
}