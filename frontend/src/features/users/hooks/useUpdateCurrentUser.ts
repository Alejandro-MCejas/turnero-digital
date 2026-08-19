import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { userService } from "../api/user.service";
import { toast } from "sonner";



export function useUpdateCurrentUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dto: UpdateUserDto) => userService.updateCurrentUser(dto),

        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["currentUser"], updatedUser)

            toast.success("Perfil actualizado correctamente")
        },

        onError: () => {
            toast.error("No se pudo actualizar el perfil")
        }
    })
}