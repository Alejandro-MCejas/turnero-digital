import { PatientAppointment } from "@/types/models/patient";


export function getStatusVariant(status: PatientAppointment["status"]) {
    switch (status) {
        case "Confirmado":
            return "success"

        case "Pendiente":
            return "warning"

        case "Cancelado":
            return "danger"

        case "Completado":
            return "info"
    }
}