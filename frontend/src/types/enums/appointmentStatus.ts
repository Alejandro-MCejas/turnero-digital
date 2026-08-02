export const appointmentStatus = {
    Confirmado: "Confirmado",
    Pendiente: "Pendiente",
    Cancelado: "Cancelado",
    Completado: "Completado",
} as const;

export type AppointmentStatus = (typeof appointmentStatus)[keyof typeof appointmentStatus];