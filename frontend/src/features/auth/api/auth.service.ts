import api from "@/lib/api/axios";
import { RegisterDto } from "../dto/register.dto";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { LoginDto } from "../dto/login.dto";
import { LoginResponse, LogoutResponse } from "../types/auth";
import { ForgotPasswordDto } from "../dto/forgotPassword.dto";
import { ResetPasswordDto } from "../dto/resetPassword.dto";
import { ChangePasswordDto } from "../dto/changePassword.dto";


export const authService = {
    async register(dto: RegisterDto) {
        const { data } = await api.post(`${API_ENDPOINTS.auth}/register`, dto);
        return data;
    },

    async login(dto: LoginDto): Promise<LoginResponse> {
        const { data } = await api.post<LoginResponse>(`${API_ENDPOINTS.auth}/login`, dto);
        return data;
    },

    async refreshToken(): Promise<LoginResponse> {
        const { data } = await api.post(`${API_ENDPOINTS.auth}/refresh`);
        return data;
    },

    async logout(): Promise<LogoutResponse> {
        const { data } = await api.post(`${API_ENDPOINTS.auth}/logout`);
        return data;
    },

    async forgotPassword(dto: ForgotPasswordDto) {
        const { data } = await api.post(`${API_ENDPOINTS.auth}/forgot-password`, dto);
        return data
    },

    async resetPassword(dto: ResetPasswordDto) {
        const { data } = await api.post(`${API_ENDPOINTS.auth}/reset-password`, dto);
        return data;
    },

    async getSession() {
        const { data } = await api.get(`${API_ENDPOINTS.auth}/session`)
        return data
    },

    async changePassword(dto: ChangePasswordDto): Promise<void> {
        await api.put(`${API_ENDPOINTS.auth}/change-password`, dto);
    }
}