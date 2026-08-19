import { AppointmentStatus } from "../enums/appointmentStatus";


export interface Appointment {
    id: string;
    date: string;
    time: string;
    status: AppointmentStatus;
    user: {
        id: string;
        name: string;
    }
    doctor: {
        id: string;
        name: string;
        specialty: string;
    }
}