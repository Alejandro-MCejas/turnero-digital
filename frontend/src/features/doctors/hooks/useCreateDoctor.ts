import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorService } from "../api/doctor.service";
import { toast } from "sonner";


export function useCreateDoctor() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: doctorService.createDoctor,

        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] })

            queryClient.invalidateQueries({ queryKey: ["doctors"] })

            toast.success("Médico creado correctamente")
        },

        onError: () => {
            toast.error("No se pudo crear el médico")
        }
    })
}