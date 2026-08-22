import { useQuery } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import axios from "axios";
import { refreshAccessToken } from "../api/authRefresh";


export function useSession() {
    return useQuery({
        queryKey: ["session"],

        queryFn: async () => {
            try {
                const response = await authService.getSession()

                return response.user

            } catch (error) {

                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 401
                ) {
                    await refreshAccessToken()

                    const response = await authService.getSession()

                    return response.user
                }

                throw error
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: false
    })
}