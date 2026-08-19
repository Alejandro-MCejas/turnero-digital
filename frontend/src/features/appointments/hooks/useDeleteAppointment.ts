import { useMutation, useQueryClient } from "@tanstack/react-query"
import { appointmentService } from "../api/appointment.service"
import { toast } from "sonner"


interface DeleteAppointmentData {
    id: string
}

export function useDeleteAppointment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id }: DeleteAppointmentData) => appointmentService.deleteAppointment(id),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] })

            queryClient.invalidateQueries({ queryKey: ["myAppointments"] })

            queryClient.invalidateQueries({ queryKey: ["appointment", variables.id] })

            toast.success("Turno cancelado correctamente")
        },

        onError: () => {
            toast.error("No se pudo cancelar el turno")
        }
    })
}