import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateDoctorScheduleDto } from "../dto/updateDoctorSchedule.dto";
import { scheduleService } from "../api/schedule.service";
import { toast } from "sonner";
import axios from "axios";


interface UpdateDoctorScheduleData {
    id: string
    doctorId: string
    dto: UpdateDoctorScheduleDto
}

export function useUpdateDoctorSchedule() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, dto }: UpdateDoctorScheduleData) =>
            scheduleService.updateDoctorSchedule(id, dto),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["doctorSchedules", variables.doctorId]
            })

            toast.success("Horario actualizado correctamente")
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                if (message === "Schedule overlaps with an existing schedule") {
                    toast.error("No se puede actualizar un horario que se superponga con otro.")
                    return
                }

                toast.error(message ?? "No se pudo actualizar el horario")
                return
            }

            toast.error("No se pudo actualizar el horario")
        }
    })
}