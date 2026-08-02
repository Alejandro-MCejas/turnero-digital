import { AppointmentStatus } from "../enums/appointmentStatus";

export interface PatientAppointment {
    id: string;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    status: AppointmentStatus
    address: string;
}