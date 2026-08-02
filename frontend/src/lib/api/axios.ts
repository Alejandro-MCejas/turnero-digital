import { env } from "@/config/env";
import axios from "axios";


const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api