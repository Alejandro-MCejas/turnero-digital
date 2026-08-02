import { Schedule } from "@/types/models/schedule";


export const schedules: Schedule[] = [
    {
        doctorId: 1,
        day: "Lunes",
        start: "08:00",
        end: "12:00",
        appointmentDuration: 30
    },
    {
        doctorId: 1,
        day: "Lunes",
        start: "14:00",
        end: "18:00",
        appointmentDuration: 30
    },
    {
        doctorId: 1,
        day: "Martes",
        start: "14:00",
        end: "18:00",
        appointmentDuration: 30
    },
    {
        doctorId: 1,
        day: "Martes",
        start: "08:00",
        end: "12:00",
        appointmentDuration: 30
    },
    {
        doctorId: 2,
        day: "Miércoles",
        start: "09:00",
        end: "13:00",
        appointmentDuration: 30
    },
    {
        doctorId: 2,
        day: "Viernes",
        start: "14:00",
        end: "18:00",
        appointmentDuration: 30
    },
]