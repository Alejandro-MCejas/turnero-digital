import { AppointmentStatus } from "@/types/enums/appointmentStatus";


export const appointmentStatusLabel: Record<AppointmentStatus, string> = {
    pending: "Pendiente",
    confirmed: "Confirmado",
    cancelled: "Cancelado",
    completed: "Completado",
}