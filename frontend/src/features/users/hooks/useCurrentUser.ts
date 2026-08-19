import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user.service";


export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: userService.getCurrentUser,
        refetchOnMount: "always"
    })
}