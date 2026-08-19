import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { ForgotPasswordDto } from "../dto/forgotPassword.dto";
import { toast } from "sonner";


export function useForgotPassword() {
    return useMutation({
        mutationFn: (dto: ForgotPasswordDto) => authService.forgotPassword(dto),

        onSuccess: () => {
            toast.success("Enlace enviado correctamente")
        },

        onError: () => {
            toast.error("No se pudo enviar el enlace")
        }
    })
}