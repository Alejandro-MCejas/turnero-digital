export const appointmentStatus = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    CANCELLED: "cancelled",
    COMPLETED: "completed",
} as const;

export type AppointmentStatus = (typeof appointmentStatus)[keyof typeof appointmentStatus];