import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user.service";


export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: userService.getAllUsers,
        refetchOnMount: "always"
    })
}