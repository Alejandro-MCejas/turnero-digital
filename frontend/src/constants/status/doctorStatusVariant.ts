import { DoctorStatus } from "@/types/enums/doctorStatus";


export const doctorStatusVariant: Record<DoctorStatus, "success" | "danger"> = {
    Activo: "success",
    Inactivo: "danger",
};