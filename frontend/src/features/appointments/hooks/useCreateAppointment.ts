import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAppointmentDto } from "../dto/createAppointment.dto";
import { appointmentService } from "../api/appointment.service";
import { toast } from "sonner";


export function useCreateAppointment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dto: CreateAppointmentDto) => appointmentService.createAppointment(dto),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] })

            queryClient.invalidateQueries({ queryKey: ["myAppointments"] })

            queryClient.invalidateQueries({ queryKey: ["doctorAvailability"] })

            toast.success("Turno creado correctamente")
        },

        onError: () => {
            toast.error("No se pudo crear el turno")
        }
    })
}