import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../api/appointment.service";



export function useAppointment(id: string) {
    return useQuery({
        queryKey: ["appointment", id],
        queryFn: () => appointmentService.getAppointmentById(id),
        enabled: !!id,
        refetchOnMount: "always"
    })
}