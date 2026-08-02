import { CalendarClock, CalendarDays, LayoutDashboard, Stethoscope, User, Users } from "lucide-react";


export const adminMenuItems = [
    {
        title: "General",
        items: [
            {
                label: "Dashboard",
                href: "/admin/dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Gestión",
        items: [
            {
                label: "Usuarios",
                href: "/admin/users",
                icon: Users,
            },
            {
                label: "Médicos",
                href: "/admin/doctors",
                icon: Stethoscope,
            },
            {
                label: "Horarios",
                href: "/admin/schedules",
                icon: CalendarClock,
            },
            {
                label: "Turnos",
                href: "/admin/appointments",
                icon: CalendarDays,
            },
        ],
    },
    {
        title: "Cuenta",
        items: [
            {
                label: "Mi perfil",
                href: "/admin/profile",
                icon: User,
            },
        ],
    },
];