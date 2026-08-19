import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorService } from "../api/doctor.service";
import { toast } from "sonner";


export function useDeleteDoctor() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: doctorService.deleteDoctor,

        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] })

            queryClient.invalidateQueries({ queryKey: ["doctors"] })

            toast.success("Médico eliminado correctamente")
        },

        onError: () => {
            toast.error("No se puede eliminar el médico porque tiene turnos asociados.")
        }
    })
}