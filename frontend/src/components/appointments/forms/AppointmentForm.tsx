"use client"

import { Appointment } from "@/types/models/appointment"
import Button from "../../ui/buttons/Button"
import FormActions from "../../ui/forms/FormActions"
import FormField from "../../ui/forms/FormField"
import Input from "../../ui/forms/Input"
import Select from "../../ui/forms/Select"
import { appointmentStatus, AppointmentStatus } from "@/types/enums/appointmentStatus"
import { useUsers } from "@/features/users/hooks/useUsers"
import { useDoctors } from "@/features/doctors/hooks/useDoctors"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useCreateAppointment } from "@/features/appointments/hooks/useCreateAppointment"
import { useUpdateAppointment } from "@/features/appointments/hooks/useUpdateAppointment"
import { UpdateAppointmentDto } from "@/features/appointments/dto/updateAppointment.dto"
import { CreateAppointmentDto } from "@/features/appointments/dto/createAppointment.dto"


interface AppointmentFormProps {
    appointment?: Appointment | null
    onCancel: () => void
}

interface AppointmentFormData {
    userId: string
    doctorId: string
    date: string
    time: string
    status?: AppointmentStatus
}

export default function AppointmentForm({ appointment, onCancel }: AppointmentFormProps) {

    const { data: users = [], isLoading: isLoadingUsers } = useUsers()
    const { data: doctors = [], isLoading: isLoadingDoctors } = useDoctors()

    const { register, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<AppointmentFormData>({
        mode: "onChange",
        defaultValues: {
            userId: appointment?.user.id ?? "",
            doctorId: appointment?.doctor.id ?? "",
            date: appointment?.date
                ? appointment.date.split("T")[0]
                : "",
            time: appointment?.time ?? "",
            status: appointment?.status
        }
    })

    useEffect(() => {
        if (!appointment) {
            reset({
                userId: "",
                doctorId: "",
                date: "",
                time: "",
                status: undefined
            })

            return
        }

        if (isLoadingUsers || isLoadingDoctors) {
            return
        }

        reset({
            userId: appointment.user.id,
            doctorId: appointment.doctor.id,
            date: appointment.date
                ? appointment.date.split("T")[0]
                : "",
            time: appointment.time,
            status: appointment.status
        })
    }, [
        appointment,
        isLoadingUsers,
        isLoadingDoctors,
        reset
    ])

    const { mutate: createAppointment, isPending: isCreating } = useCreateAppointment()

    const { mutate: updateAppointment, isPending: isUpdating } = useUpdateAppointment()

    const isPending = isCreating || isUpdating

    const onSubmit = (data: AppointmentFormData) => {

        if (appointment) {

            const updateData: UpdateAppointmentDto = {
                doctorId: data.doctorId,
                date: data.date,
                time: data.time,
                ...(data.status && { status: data.status })
            }

            updateAppointment({ id: appointment.id, dto: updateData }, {
                onSuccess: () => {
                    onCancel()
                }
            })

            return
        }

        const createData: CreateAppointmentDto = {
            userId: data.userId,
            doctorId: data.doctorId,
            date: data.date,
            time: data.time
        }

        createAppointment(createData, {
            onSuccess: () => {
                onCancel()
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

            <FormField label="Paciente">
                <Select className="w-full" {...register("userId", {
                    required: true
                })}
                    disabled={isPending || isLoadingUsers}
                >
                    <option value="">
                        {isLoadingUsers ? "Cargando pacientes..." : "Seleccionar paciente"}
                    </option>

                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Select>
            </FormField>

            <FormField label="Médico">
                <Select className="w-full" {...register("doctorId", {
                    required: true
                })}
                    disabled={isPending || isLoadingDoctors}
                >
                    <option value="">
                        {isLoadingDoctors ? "Cargando médicos..." : "Seleccionar médico"}
                    </option>

                    {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>
                    ))}
                </Select>
            </FormField>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Fecha">
                    <Input type="date" {...register("date", {
                        required: true
                    })}
                        disabled={isPending}
                    />
                </FormField>

                <FormField label="Hora">
                    <Input type="time" {...register("time", {
                        required: true
                    })}
                        disabled={isPending}
                    />
                </FormField>
            </div>

            {appointment && (
                <FormField label="Estado">
                    <Select
                        className="w-full"
                        {...register("status", { required: true })}
                        disabled={isPending}
                    >
                        <option value={appointmentStatus.PENDING}>Pendiente</option>
                        <option value={appointmentStatus.CONFIRMED}>Confirmado</option>
                        <option value={appointmentStatus.CANCELLED}>Cancelado</option>
                        <option value={appointmentStatus.COMPLETED}>Completado</option>
                    </Select>
                </FormField>
            )}


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
                    disabled={
                        !isDirty ||
                        !isValid ||
                        isPending ||
                        isLoadingUsers ||
                        isLoadingDoctors
                    }
                    className="justify-center sm:w-auto"
                >
                    {isPending
                        ? appointment
                            ? "Actualizando..."
                            : "Guardando..."
                        : appointment
                            ? "Actualizar"
                            : "Guardar"
                    }
                </Button>
            </FormActions>
        </form>
    )
}