import { Hospital, User } from "lucide-react";


export const userTypes = [
    {
        icon: User,
        title: "Pacientes",
        description:
            "Reservá turnos de forma rápida y sencilla con el profesional que necesites.",
        items: [
            "Buscar profesionales",
            "Elegir fecha y horario",
            "Consultar tus turnos"
        ]
    },
    {
        icon: Hospital,
        title: "Centros médicos",
        description:
            "Administrá toda la atención desde un único panel.",
        items: [
            "Gestionar médicos",
            "Administrar horarios disponibles",
            "Gestionar turnos de pacientes",
            "Visualizar el panel administrativo"
        ]
    }
]