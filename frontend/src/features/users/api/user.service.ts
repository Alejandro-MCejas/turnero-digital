import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { User } from "@/types/models/user";

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

    // async createUser(dto: CreateUserDto): Promise<User> {}

    // async updateUser(id: string, dto: UpdateUserDto): Promise<User> {}

    // async updateUserRole(id: string, dto: UpdateUserRoleDto): Promise<User> {}

    async deleteUser(id: string): Promise<void> {
        await api.delete(`${API_ENDPOINTS.users}/${id}`);
    }
}