import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../api/auth.service";
import { toast } from "sonner";


export function useLogout() {
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authService.logout,

        onSuccess: () => {
            queryClient.setQueryData(["session"], null)

            toast.success("Sesión cerrada correctamente")

            router.push("/login")
        },

        onError: (error) => {
            console.log(error)

            queryClient.setQueryData(["session"], null)

            router.push("/login")
        }
    })
}