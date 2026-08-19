import { UserRole } from "@/types/enums/userRole"


export interface User {
    id: string
    name: string
    email: string
    birthDate: string
    nDni: string
    role: UserRole
}