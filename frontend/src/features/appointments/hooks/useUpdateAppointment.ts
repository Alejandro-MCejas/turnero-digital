import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateAppointmentDto } from "../dto/updateAppointment.dto"
import { appointmentService } from "../api/appointment.service"
import { toast } from "sonner"


interface UpdateAppointmentData {
    id: string
    dto: UpdateAppointmentDto
}

export function useUpdateAppointment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, dto }: UpdateAppointmentData) => appointmentService.updateAppointment(id, dto),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] })

            queryClient.invalidateQueries({ queryKey: ["myAppointments"] })

            queryClient.invalidateQueries({ queryKey: ["appointment", variables.id] })

            queryClient.invalidateQueries({ queryKey: ["doctorAvailability"] })

            toast.success("Turno actualizado correctamente")
        },

        onError: () => {
            toast.error("No se pudo actualizar el turno")
        }
    })
}