import { useQuery } from "@tanstack/react-query";
import { doctorService } from "../api/doctor.service";


export function useDoctorAvailability(doctorId: string, date: string) {
    return useQuery({
        queryKey: ["doctorAvailability", doctorId, date],
        queryFn: () => doctorService.getDoctorAvailability(doctorId, date),
        enabled: !!doctorId && !!date,
        refetchOnMount: "always"
    })
}