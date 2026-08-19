import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../api/schedule.service";


export function useDoctorSchedules(doctorId: string) {
    return useQuery({
        queryKey: ["doctorSchedules", doctorId],
        queryFn: () => scheduleService.getDoctorSchedules(doctorId),
        enabled: !!doctorId,
        refetchOnMount: "always"
    })
}