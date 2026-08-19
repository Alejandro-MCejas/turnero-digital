import { UpdateUserRoleDto } from "@/features/users/dto/updateUserRole.dto";
import { useUpdateUserRole } from "@/features/users/hooks/useUpdateUserRole";
import { User } from "@/types/models/user";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../ui/overlay/Modal";
import FormField from "../ui/forms/FormField";
import Select from "../ui/forms/Select";
import { userRole } from "@/types/enums/userRole";
import FormActions from "../ui/forms/FormActions";
import Button from "../ui/buttons/Button";


interface ChangeUserRoleModalProps {
    open: boolean;
    user: User | null;
    onClose: () => void;
}

export default function ChangeUserRoleModal({ open, user, onClose }: ChangeUserRoleModalProps) {
    const { register, handleSubmit, reset } = useForm<UpdateUserRoleDto>()

    const { mutate: updateRole, isPending } = useUpdateUserRole()

    useEffect(() => {
        if (user) {
            reset({
                role: user.role
            })
        }
    }, [user, reset])

    const onSubmit = (data: UpdateUserRoleDto) => {
        if (!user) return

        updateRole({ id: user.id, dto: data }, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Modal
            open={open}
            title="Cambiar rol"
            subtitle={user?.name}
            onClose={onClose}
            size="sm"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField label="Rol">
                    <Select className="w-full" {...register("role")}>
                        <option value={userRole.User}>Usuario</option>
                        <option value={userRole.Admin}>Administrador</option>
                    </Select>
                </FormField>

                <FormActions>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>

                    <Button disabled={isPending}>
                        {isPending ? "Guardando..." : "Guardar"}
                    </Button>
                </FormActions>
            </form>
        </Modal>
    )
}