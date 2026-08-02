import { PatientAppointment } from "@/types/models/patient";

export const appointments: PatientAppointment[] = [
    {
        id: "1",
        doctor: "Dr. Juan Pérez",
        specialty: "Cardiología",
        date: "25 Jul 2026",
        time: "10:30",
        status: "Confirmado",
        address: "Calle 123, Ciudad"
    },
    {
        id: "2",
        doctor: "Dra. Ana Gómez",
        specialty: "Dermatología",
        date: "29 Jul 2026",
        time: "16:00",
        status: "Pendiente",
        address: "Calle 456, Ciudad"
    },
];