import Button from "../../ui/buttons/Button";
import Input from "../../ui/forms/Input";
import Select from "../../ui/forms/Select";
import FormField from "../../ui/forms/FormField";
import FormActions from "../../ui/forms/FormActions";
import { Schedule } from "@/types/models/schedule";
import { useForm } from "react-hook-form";
import { CreateDoctorScheduleDto } from "@/features/schedules/dto/createDoctorSchedule.dto";
import { useCreateDoctorSchedule } from "@/features/schedules/hooks/useCreateDoctorSchedule";
import { useUpdateDoctorSchedule } from "@/features/schedules/hooks/useUpdateDoctorSchedule";
import { DoctorScheduleDay } from "@/types/enums/doctorScheduleDay";
import { useEffect } from "react";

interface ScheduleFormProps {
    schedule?: Schedule | null
    doctorId: string
    onCancel: () => void
}

export default function ScheduleForm({ schedule, doctorId, onCancel }: ScheduleFormProps) {

    const { register, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<CreateDoctorScheduleDto>({
        mode: "onChange",
        defaultValues: {
            dayOfWeek: schedule?.dayOfWeek,
            startTime: schedule?.startTime ?? "",
            endTime: schedule?.endTime ?? ""
        }
    })

    useEffect(() => {
        reset({
            dayOfWeek: schedule?.dayOfWeek,
            startTime: schedule?.startTime ?? "",
            endTime: schedule?.endTime ?? ""
        })
    }, [schedule, reset])

    const { mutate: createDoctorSchedule, isPending: isCreating } = useCreateDoctorSchedule()

    const { mutate: updateDoctorSchedule, isPending: isUpdating } = useUpdateDoctorSchedule()

    const isPending = isCreating || isUpdating

    const onSubmit = (data: CreateDoctorScheduleDto) => {
        if (schedule) {
            updateDoctorSchedule({ id: schedule.id, doctorId, dto: data }, {
                onSuccess: () => {
                    onCancel()
                }
            })

            return
        }

        createDoctorSchedule({ doctorId, dto: data }, {
            onSuccess: () => {
                onCancel()
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField label="Día">
                <Select className="w-full" {...register("dayOfWeek", {
                    setValueAs: (value) =>
                        value === ""
                            ? undefined
                            : Number(value)
                })}
                >
                    <option value="" disabled>Seleccionar día</option>
                    <option value={DoctorScheduleDay.MONDAY}>Lunes</option>
                    <option value={DoctorScheduleDay.TUESDAY}>Martes</option>
                    <option value={DoctorScheduleDay.WEDNESDAY}>Miércoles</option>
                    <option value={DoctorScheduleDay.THURSDAY}>Jueves</option>
                    <option value={DoctorScheduleDay.FRIDAY}>Viernes</option>
                    <option value={DoctorScheduleDay.SATURDAY}>Sábado</option>
                    <option value={DoctorScheduleDay.SUNDAY}>Domingo</option>
                </Select>
            </FormField>


            <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Hora inicio">
                    <Input type="time" {...register("startTime", { required: true })} />
                </FormField>
                <FormField label="Hora fin">
                    <Input type="time" {...register("endTime", { required: true })} />
                </FormField>
            </div>

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
                    disabled={!isDirty || !isValid || isPending}
                    className="justify-center sm:w-auto"
                >
                    {isPending
                        ? schedule
                            ? "Actualizando..."
                            : "Guardando..."
                        : schedule
                            ? "Actualizar"
                            : "Guardar"
                    }
                </Button>
            </FormActions>
        </form>
    )
}