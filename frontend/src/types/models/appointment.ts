import { AppointmentStatus } from "../enums/appointmentStatus";


export interface Appointment {
    id: string;
    patient: string;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    status: AppointmentStatus;
}