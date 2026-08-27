"use client"

import { Appointment } from "@/types/models/appointment"
import Button from "../../ui/buttons/Button"
import FormActions from "../../ui/forms/FormActions"
import FormField from "../../ui/forms/FormField"
import Select from "../../ui/forms/Select"
import { appointmentStatus, AppointmentStatus } from "@/types/enums/appointmentStatus"
import { useUsers } from "@/features/users/hooks/useUsers"
import { useDoctors } from "@/features/doctors/hooks/useDoctors"
import { useForm, useWatch } from "react-hook-form"
import { useEffect } from "react"
import { useCreateAppointment } from "@/features/appointments/hooks/useCreateAppointment"
import { useUpdateAppointment } from "@/features/appointments/hooks/useUpdateAppointment"
import { UpdateAppointmentDto } from "@/features/appointments/dto/updateAppointment.dto"
import { CreateAppointmentDto } from "@/features/appointments/dto/createAppointment.dto"
import AppointmentTimeSlots from "./AppointmentTimeSlots"
import DoctorWeeklySchedule from "./DoctorWeeklySchedule"
import Input from "@/components/ui/forms/Input"


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

    const { register, handleSubmit, reset, control, setValue, formState: { isDirty, isValid } } = useForm<AppointmentFormData>({
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

    const selectedDoctor = useWatch({ control, name: "doctorId" })

    const selectedDate = useWatch({ control, name: "date" })

    const selectedTime = useWatch({ control, name: "time" })

    const { mutate: createAppointment, isPending: isCreating } = useCreateAppointment()

    const { mutate: updateAppointment, isPending: isUpdating } = useUpdateAppointment()

    const isPending = isCreating || isUpdating

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

        if (isLoadingUsers || isLoadingDoctors) return

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

    const handleDoctorChange = (doctorId: string) => {
        setValue("doctorId", doctorId, {
            shouldDirty: true,
            shouldValidate: true
        })

        setValue("date", "", {
            shouldDirty: true,
            shouldValidate: true
        })

        setValue("time", "", {
            shouldDirty: true,
            shouldValidate: true
        })
    }

    const handleDateChange = (date: string) => {

        setValue("date", date, {
            shouldDirty: true,
            shouldValidate: true
        })

        setValue("time", "", {
            shouldDirty: true,
            shouldValidate: true
        })
    }

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
                    disabled={isPending || isLoadingUsers || !!appointment}
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
                <Select
                    className="w-full"
                    value={selectedDoctor}
                    onChange={e => handleDoctorChange(e.target.value)}
                    disabled={isPending || isLoadingDoctors}
                >
                    <option value="">
                        {isLoadingDoctors ? "Cargando médicos..." : "Seleccionar médico"}
                    </option>

                    {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty}
                        </option>
                    ))}
                </Select>
            </FormField>

            <DoctorWeeklySchedule doctorId={selectedDoctor} selectedDate={selectedDate} />

            <FormField label="Fecha">
                <Input
                    type="date"
                    {...register("date", {
                        required: true
                    })}
                    onChange={(e) => handleDateChange(e.target.value)}
                    disabled={isPending || !selectedDoctor}
                    className="w-full"
                />
            </FormField>

            <AppointmentTimeSlots
                doctorId={selectedDoctor}
                date={selectedDate}
                selectedTime={selectedTime}
                onSelect={time => setValue("time", time, {
                    shouldDirty: true,
                    shouldValidate: true
                })}
            />

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
                        isLoadingDoctors ||
                        !selectedTime
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