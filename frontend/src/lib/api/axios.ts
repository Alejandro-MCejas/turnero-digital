import { env } from "@/config/env";
import { queryClient } from "@/config/queryClient";
import { refreshAccessToken } from "@/features/auth/api/authRefresh";
import axios from "axios";


const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config

    if (
        error.response?.status !== 401 ||
        originalRequest?._retry ||
        originalRequest?.url?.includes("/auth/login") ||
        originalRequest?.url?.includes("/auth/refresh") ||
        originalRequest?.url?.includes("/auth/session")
    ) {
        return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
        await refreshAccessToken()

        return api(originalRequest)

    } catch {
        queryClient.clear()

        if (
            typeof window !== "undefined" &&
            window.location.pathname !== "/login"
        ) {
            window.location.replace("/login")
        }

        return Promise.reject(error)
    }
}
)

export default api