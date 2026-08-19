import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorService } from "../api/doctor.service";
import { UpdateDoctorDto } from "../dto/updateDoctor.dto";
import { toast } from "sonner";


export function useUpdateDoctor() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, dto }: { id: string, dto: UpdateDoctorDto }) => doctorService.updateDoctor(id, dto),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"] })

            toast.success("Médico actualizado correctamente")
        },

        onError: () => {
            toast.error("No se pudo actualizar el médico")
        }
    })
}