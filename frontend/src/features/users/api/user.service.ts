import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { User } from "@/types/models/user";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { UpdateUserRoleDto } from "../dto/updateUserRole.dto";

export const userService = {

    async getAllUsers(): Promise<User[]> {
        const { data } = await api.get<User[]>(API_ENDPOINTS.users);

        return data;
    },

    async getCurrentUser(): Promise<User> {
        const { data } = await api.get<User>(`${API_ENDPOINTS.users}/me`);
        
        return data;
    },

    async getUserById(id: string): Promise<User> {
        const { data } = await api.get<User>(`${API_ENDPOINTS.users}/${id}`);

        return data
    },

    async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
        const { data } = await api.put<User>(`${API_ENDPOINTS.users}/${id}`, dto);

        return data
    },

    async updateCurrentUser(dto: UpdateUserDto): Promise<User> {
        const { data } = await api.put<User>(`${API_ENDPOINTS.users}/me`, dto);

        return data
    },

    async updateUserRole(id: string, dto: UpdateUserRoleDto): Promise<User> {
        const { data } = await api.patch<User>(`${API_ENDPOINTS.users}/${id}/role`, dto)

        return data
    },

    async deleteUser(id: string): Promise<void> {
        await api.delete(`${API_ENDPOINTS.users}/${id}`);
    }
}