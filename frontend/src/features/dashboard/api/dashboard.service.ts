import api from "@/lib/api/axios";
import { DashboardStats } from "../../../types/models/dashboard";
import { API_ENDPOINTS } from "@/lib/api/endpoints";


export const dashboardService = {
    async getStats(): Promise<DashboardStats> {
        const { data } = await api.get<DashboardStats>(`${API_ENDPOINTS.dashboard}/stats`)

        return data
    }
}