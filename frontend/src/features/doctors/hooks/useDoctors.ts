import { useQuery } from "@tanstack/react-query";
import { doctorService } from "../api/doctor.service";


export function useDoctors() {
    return useQuery({
        queryKey: ["doctors"],
        queryFn: doctorService.getAllDoctors,
        refetchOnMount: "always"
    })
}