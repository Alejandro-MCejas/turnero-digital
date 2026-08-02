import { Appointment } from "@/types/models/appointment";

export const appointments: Appointment[] = [
    {
        id: "1",
        patient: "María González",
        doctor: "Dr. Juan Pérez",
        specialty: "Consulta general",
        date: "2026-06-26",
        time: "09:00",
        status: "Confirmado"
    },
    {
        id: "2",
        patient: "Juan López",
        doctor: "Dra. Ana García",
        specialty: "Cardiología",
        date: "2026-06-26",
        time: "10:00",
        status: "Pendiente"
    },
    {
        id: "3",
        patient: "Laura Rodríguez",
        doctor: "Dra. Ana García",
        specialty: "Traumatología",
        date: "2026-06-26",
        time: "11:00",
        status: "Cancelado"
    },
    {
        id: "4",
        patient: "Pedro Rodríguez",
        doctor: "Dr. Martín López",
        specialty: "Pediatria",
        date: "2026-06-26",
        time: "12:00",
        status: "Confirmado"
    },
    {
        id: "5",
        patient: "María López",
        doctor: "Dr. Martín López",
        specialty: "Consulta general",
        date: "2026-06-26",
        time: "13:00",
        status: "Completado"
    }
]