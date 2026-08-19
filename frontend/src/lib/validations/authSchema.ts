import { z } from "zod"
import { parseDateOnly } from "../utils/parseDateOnly"

export const PasswordSchema = z
    .string()
    .min(8, "Debe contener al menos 8 caracteres")
    .max(30, "Es demasiado larga la contraseña")
    .regex(/[A-Z]/, "Debe contener una letra mayúscula")
    .regex(/[a-z]/, "Debe contener una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")

export const LoginSchema = z.object({
    email: z.string().email("Email Inválido"),
    password: z.string().min(8, "Minimo 8 caracteres")
})

export const RegisterSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "El nombre es muy corto ")
        .max(50, "El nombre es muy largo")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo puede contener letras y acentos"),

    email: z
        .string()
        .trim()
        .email("Email Inválido")
        .toLowerCase(),

    password: PasswordSchema,

    confirmPassword: z
        .string()
        .min(1, "Confirmá tu contraseña"),

    birthDate: z
        .string()
        .min(1, "Debes ingresar tu fecha de nacimiento")
        .refine((date) => {

            const birth = parseDateOnly(date)
            if (isNaN(birth.getTime())) return false

            const today = new Date()
            const minDate = parseDateOnly("1900-01-01")
            if (birth < minDate || birth > today) return false


            let age = today.getFullYear() - birth.getFullYear()
            const m = today.getMonth() - birth.getMonth()

            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--
            }
            return age >= 18
        }, "Debes ser mayor de 18 años"),

    nDni: z
        .string()
        .min(7, "DNI Inválido")
        .max(8, "DNI Inválido")
        .regex(/^\d+$/, "El DNI solo puede contener números"),
})
    .refine(data => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden"
    })

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Email Inválido")
        .toLowerCase(),
})

export const ResetPasswordSchema = z.object({
    password: PasswordSchema,

    confirmPassword: z
        .string()
        .min(1, "Confirmá tu contraseña"),
})
    .refine(data => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden"
    })

export const ChangePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "Ingresá tu contraseña actual"),

    newPassword: PasswordSchema,

    confirmPassword: z
        .string()
        .min(1, "Confirmá tu contraseña"),
})
    .refine(data => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden"
    })