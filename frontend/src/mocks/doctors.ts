import { Doctor } from "@/types/models/doctor";

export const doctors: Doctor[] = [
    {
        id: 1,
        name: "Dr. Juan Pérez",
        specialty: "Cardiología",
        email: "juan.perez@example.com",
        phone: "+54 351 555-1234",
        status: "Activo",
    },
    {
        id: 2,
        name: "Dra. Ana García",
        specialty: "Pediatría",
        email: "ana.garcia@example.com",
        phone: "+54 351 555-5678",
        status: "Activo",
    },
    {
        id: 3,
        name: "Dr. Martín López",
        specialty: "Traumatología",
        email: "martin.lopez@example.com",
        phone: "+54 351 555-9876",
        status: "Inactivo",
    },
];