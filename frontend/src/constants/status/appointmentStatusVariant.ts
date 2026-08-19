import { AppointmentStatus } from "@/types/enums/appointmentStatus";

export const appointmentStatusVariant: Record<AppointmentStatus, "success" | "warning" | "danger" | "info"> = {
    pending: "warning",
    confirmed: "success",
    cancelled: "danger",
    completed: "info",
} as const;
