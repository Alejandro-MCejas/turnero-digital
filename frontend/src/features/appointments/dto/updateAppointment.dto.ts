import { AppointmentStatus } from "@/types/enums/appointmentStatus";


export interface UpdateAppointmentDto {
    doctorId?: string;
    date?: string;
    time?: string;
    status?: AppointmentStatus
}