import { AppointmentStatus, appointmentStatus } from "@/types/enums/appointmentStatus";

export function getStatusVariant(status: AppointmentStatus) {
    switch (status) {
        case appointmentStatus.CONFIRMED:
            return "success"

        case appointmentStatus.PENDING:
            return "warning"

        case appointmentStatus.CANCELLED:
            return "danger"

        case appointmentStatus.COMPLETED:
            return "info"
    }
}