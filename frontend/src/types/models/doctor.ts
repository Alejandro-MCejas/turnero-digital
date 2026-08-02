import { DoctorStatus } from "@/types/enums/doctorStatus";

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    email: string;
    phone: string;
    status: DoctorStatus;
}