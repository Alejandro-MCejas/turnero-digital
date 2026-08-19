import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../api/user.service";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { toast } from "sonner";


export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, dto }: { id: string, dto: UpdateUserDto }) => userService.updateUser(id, dto),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })

            toast.success("Usuario actualizado correctamente")
        },

        onError: () => {
            toast.error("No se pudo actualizar el usuario")
        }
    })
}