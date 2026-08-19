import { User } from "@/types/models/user"
import Button from "../ui/buttons/Button"
import FormActions from "../ui/forms/FormActions"
import FormField from "../ui/forms/FormField"
import Input from "../ui/forms/Input"
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser"
import { useForm } from "react-hook-form"
import { UpdateUserDto } from "@/features/users/dto/updateUser.dto"
import { useEffect } from "react"


interface UserFormProps {
    user?: User | null
    onCancel: () => void
}

export default function UserForm({ user, onCancel }: UserFormProps) {

    const { register, handleSubmit, reset, formState: { isDirty } } = useForm<UpdateUserDto>()

    useEffect(() => {
        reset({
            name: user?.name ?? "",
            email: user?.email ?? "",
            nDni: user?.nDni ?? "",
            birthDate: user?.birthDate
                ? user.birthDate.split("T")[0]
                : "",
        })
    }, [user, reset])

    const { mutate: updateUser, isPending } = useUpdateUser()

    const onSubmit = (data: UpdateUserDto) => {
        if (!user) return

        updateUser({ id: user.id, dto: data }, {
            onSuccess: () => {
                onCancel()
            }
        })

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField label="Nombre">
                <Input {...register("name")} placeholder="Juan Pérez" />
            </FormField>

            <FormField label="Email">
                <Input type="email" {...register("email")} placeholder="juan.perez@email.com" />
            </FormField>

            <FormField label="DNI">
                <Input {...register("nDni")} placeholder="12345678" />
            </FormField>

            <FormField label="Fecha de nacimiento">
                <Input type="date" {...register("birthDate")} />
            </FormField>

            <FormActions>
                <Button
                    variant="secondary"
                    type="button"
                    disabled={isPending}
                    onClick={onCancel}
                    className="justify-center sm:w-auto"
                >
                    Cancelar
                </Button>

                <Button disabled={!isDirty || isPending} className="justify-center sm:w-auto">
                    {isPending
                        ? "Actualizando..."
                        : "Actualizar"
                    }
                </Button>
            </FormActions>
        </form>
    )
}