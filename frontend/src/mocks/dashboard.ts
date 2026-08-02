import { chartColors } from "@/constants/colors";


export const status = [
    {
        name: "Confirmados",
        value: 72,
        percentage: "60%",
        variant: "success",
        fill: chartColors.success
    },
    {
        name: "Pendientes",
        value: 20,
        percentage: "16.7%",
        variant: "warning",
        fill: chartColors.warning
    },
    {
        name: "Cancelados",
        value: 12,
        percentage: "10%",
        variant: "danger",
        fill: chartColors.danger
    },
    {
        name: "Completados",
        value: 16,
        percentage: "13.3%",
        variant: "info",
        fill: chartColors.completed
    }

] as const

export const agenda = [
    {
        id: 1,
        patient: "Alejandro manuel cejas",
        specialty: "Cardiologia",
        time: "10:00",
        status: "Confirmado"
    },
    {
        id: 2,
        patient: "Juan Perez",
        specialty: "Cardiologia",
        time: "10:00",
        status: "Pendiente"
    },
    {
        id: 3,
        patient: "Juan Perez",
        specialty: "Cardiologia",
        time: "10:00",
        status: "Confirmado"
    },
    {
        id: 4,
        patient: "Juan Perez",
        specialty: "Cardiologia",
        time: "10:00",
        status: "Confirmado"
    }
] as const


export const appointmentsPerDay = [
    { day: "Lun", appointments: 40 },
    { day: "Mar", appointments: 62 },
    { day: "Mié", appointments: 45 },
    { day: "Jue", appointments: 50 },
    { day: "Vie", appointments: 40 },
    { day: "Sáb", appointments: 20 },
    { day: "Dom", appointments: 10 },
]