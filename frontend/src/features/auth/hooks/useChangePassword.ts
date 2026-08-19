import { useMutation } from "@tanstack/react-query";
import { ChangePasswordDto } from "../dto/changePassword.dto";
import { authService } from "../api/auth.service";
import { toast } from "sonner";


export function useChangePassword() {
    return useMutation({
        mutationFn: (dto: ChangePasswordDto) => authService.changePassword(dto),

        onSuccess: () => {
            toast.success("Contraseña actualizada correctamente")
        },

        onError: () => {
            toast.error("No se pudo actualizar la contraseña")
        }
    })
}