import { userRole, UserRole } from "@/types/enums/userRole";

export const userRoleLabel: Record<UserRole, string> = {
    [userRole.Admin]: "Administrador",
    [userRole.User]: "Paciente",
}