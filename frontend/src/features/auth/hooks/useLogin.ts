import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/auth.service";


export function useLogin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authService.login,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["session"]
            })
        },

        onError: error => {
            console.error("Error en login:", error)
        }
    })
}