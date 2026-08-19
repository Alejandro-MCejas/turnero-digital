import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "../api/appointment.service";



export function useMyAppointments() {
    return useQuery({
        queryKey: ["myAppointments"],
        queryFn: appointmentService.getMyAppointments,
        refetchOnMount: "always"
    })
}