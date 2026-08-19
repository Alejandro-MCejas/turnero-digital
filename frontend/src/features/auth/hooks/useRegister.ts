import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../api/auth.service";
import { toast } from "sonner";



export function useRegister() {
    const router = useRouter()

    return useMutation({
        mutationFn: authService.register,

        onSuccess: () => {
            toast.success("Cuenta creada correctamente")
            router.push("/login")
        },

        onError: (error) => {
            console.log(error)
            toast.error("Error al crear la cuenta")
        }
    })
}