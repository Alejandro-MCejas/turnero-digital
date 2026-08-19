import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../api/dashboard.service";


export function useDashboardStats() {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: dashboardService.getStats,
        refetchOnMount: "always"
    })
}