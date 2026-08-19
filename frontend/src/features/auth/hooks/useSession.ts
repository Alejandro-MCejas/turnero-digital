import { useQuery } from "@tanstack/react-query";
import { authService } from "../api/auth.service";


export function useSession() {
    return useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            const session = await authService.getSession()
            return session.user
        },
        retry: false,
        staleTime: 0,
        refetchOnMount: false
    })
}