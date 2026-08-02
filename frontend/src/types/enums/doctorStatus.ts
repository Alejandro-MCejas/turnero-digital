export const doctorStatus = {
    Activo: "Activo",
    Inactivo: "Inactivo",
} as const;

export type DoctorStatus = (typeof doctorStatus)[keyof typeof doctorStatus];