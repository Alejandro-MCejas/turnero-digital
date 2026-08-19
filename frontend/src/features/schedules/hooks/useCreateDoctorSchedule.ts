import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateDoctorScheduleDto } from "../dto/createDoctorSchedule.dto"
import { scheduleService } from "../api/schedule.service"
import { toast } from "sonner"
import axios from "axios"


interface CreateDoctorScheduleData {
    doctorId: string
    dto: CreateDoctorScheduleDto
}

export function useCreateDoctorSchedule() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ doctorId, dto }: CreateDoctorScheduleData) =>
            scheduleService.createDoctorSchedule(doctorId, dto),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["doctorSchedules", variables.doctorId]
            })

            toast.success("Horario creado correctamente")
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                if (message === "Schedule overlaps with an existing schedule") {
                    toast.error("No se puede crear un horario que se superponga con otro.")
                    return
                }

                toast.error(message ?? "No se pudo crear el horario")
                return
            }

            toast.error("No se pudo crear el horario")
        }
    })
}