import { useMutation, useQueryClient } from "@tanstack/react-query"
import { scheduleService } from "../api/schedule.service"
import { toast } from "sonner"


interface DeleteDoctorScheduleData {
    id: string
    doctorId: string
}

export function useDeleteDoctorSchedule() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id }: DeleteDoctorScheduleData) =>
            scheduleService.deleteDoctorSchedule(id),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["doctorSchedules", variables.doctorId]
            })

            toast.success("Horario eliminado correctamente")
        },

        onError: () => {
            toast.error("No se pudo eliminar el horario")
        }
    })
}