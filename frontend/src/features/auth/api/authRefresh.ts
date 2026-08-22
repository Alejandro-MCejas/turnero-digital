import api from "@/lib/api/axios";


let refreshPromise: Promise<void> | null = null;

export async function refreshAccessToken(): Promise<void> {
    if (!refreshPromise) {
        refreshPromise = api
            .post("/auth/refresh")
            .then(() => undefined)
            .finally(() => (refreshPromise = null));
    }

    return refreshPromise;
}