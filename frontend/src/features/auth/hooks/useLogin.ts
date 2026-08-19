import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { useRouter } from "next/navigation";
import { userRole } from "@/types/enums/userRole";


export function useLogin() {
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authService.login,

        onSuccess: async () => {
            try {
                const session = await queryClient.fetchQuery({
                    queryKey: ["session"],
                    queryFn: async () => {
                        const session = await authService.getSession()
                        return session.user
                    },
                })

                if (session.role === userRole.Admin) {
                    router.push("/admin/dashboard")
                    return
                }

                router.push("/patient/dashboard")
            } catch (error) {
                console.log(error)
                router.push("/login")
            }
        },

        onError: (error) => {
            console.log(error)
        }
    })
}