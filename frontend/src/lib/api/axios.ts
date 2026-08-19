import { env } from "@/config/env";
import { queryClient } from "@/config/queryClient";
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
        error.response?.status === 401 &&
        !originalRequest.url?.includes("/auth/login") &&
        !originalRequest.url?.includes("/auth/refresh")
    ) {

        if (originalRequest._retry) {

            if (typeof window !== "undefined" && window.location.pathname !== "/login") {
                queryClient.clear()
                window.location.replace("/login")
            }

            return Promise.reject(error)
        }

        originalRequest._retry = true


        try {
            await api.post("/auth/refresh")

            return api(originalRequest)
        } catch {

            if (typeof window !== "undefined" && window.location.pathname !== "/login") {
                queryClient.clear()
                window.location.replace("/login")
            }

            return Promise.reject(error)
        }
    }

    return Promise.reject(error)
})

export default api