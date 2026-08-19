import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../api/user.service";
import { UpdateUserRoleDto } from "../dto/updateUserRole.dto";
import { toast } from "sonner";


export function useUpdateUserRole() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, dto }: { id: string, dto: UpdateUserRoleDto }) => userService.updateUserRole(id, dto),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })

            toast.success("Rol actualizado correctamente")
        },

        onError: () => {
            toast.error("No se pudo actualizar el rol")
        }
    })
}