import { Doctor } from "@/types/models/doctor"
import Button from "../../ui/buttons/Button"
import FormActions from "../../ui/forms/FormActions"
import FormField from "../../ui/forms/FormField"
import Input from "../../ui/forms/Input"
import { useForm } from "react-hook-form"
import { useUpdateDoctor } from "@/features/doctors/hooks/useUpdateDoctor"
import { CreateDoctorDto } from "@/features/doctors/dto/createDoctor.dto"
import { useCreateDoctor } from "@/features/doctors/hooks/useCreateDoctor"


interface DoctorFormProps {
    doctor?: Doctor | null
    onCancel: () => void
}

export default function DoctorForm({ doctor, onCancel }: DoctorFormProps) {

    const { register, handleSubmit, formState: { isDirty } } = useForm<CreateDoctorDto>({
        defaultValues: {
            name: doctor?.name ?? "",
            specialty: doctor?.specialty ?? ""
        }
    })

    const { mutate: createDoctor, isPending: isCreating } = useCreateDoctor()

    const { mutate: updateDoctor, isPending: isUpdating } = useUpdateDoctor()

    const isPending = isCreating || isUpdating

    const onSubmit = (data: CreateDoctorDto) => {
        if (doctor) {
            updateDoctor({ id: doctor.id, dto: data }, {
                onSuccess: () => {
                    onCancel()
                }
            })

            return
        }

        createDoctor(data, {
            onSuccess: () => {
                onCancel()
            }
        })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField label="Nombre">
                <Input {...register("name")} placeholder="Juan Martínez" />
            </FormField>

            <FormField label="Especialidad">
                <Input {...register("specialty")} placeholder="Cardiología" />
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

                <Button
                    type="submit"
                    disabled={!isDirty || isPending}
                    className="justify-center sm:w-auto"
                >
                    {isPending
                        ? doctor
                            ? "Actualizando..."
                            : "Guardando..."
                        : doctor
                            ? "Actualizar"
                            : "Guardar"
                    }
                </Button>
            </FormActions>
        </form>
    )
}