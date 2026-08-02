import { CalendarDays, CalendarPlus, House, User, } from "lucide-react";

export const patientMenuItems = [
    {
        label: "Inicio",
        href: "/patient/dashboard",
        icon: House,
    },
    {
        label: "Mis turnos",
        href: "/patient/appointments",
        icon: CalendarDays,
    },
    {
        label: "Solicitar turno",
        href: "/patient/book-appointment",
        icon: CalendarPlus,
    },
    {
        label: "Mi perfil",
        href: "/patient/profile",
        icon: User,
    },
];