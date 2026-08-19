import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../api/user.service";
import { toast } from "sonner";


export function useDeleteUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: userService.deleteUser,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })

            toast.success("Usuario eliminado correctamente")
        },

        onError: () => {
            toast.error("No se puede eliminar un usuario con turnos asociados.")
        }
    })
}