import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Doctor } from "@/types/models/doctor";
import { CreateDoctorDto } from "../dto/createDoctor.dto";
import { UpdateDoctorDto } from "../dto/updateDoctor.dto";



export const doctorService = {
    async getAllDoctors(): Promise<Doctor[]> {
        const { data } = await api.get<Doctor[]>(API_ENDPOINTS.doctors)
        return data
    },

    async getDoctorById(id: string): Promise<Doctor> {
        const { data } = await api.get<Doctor>(`${API_ENDPOINTS.doctors}/${id}`);
        return data;
    },

    async getDoctorAvailability(id: string, date: string): Promise<string[]> {
        const { data } = await api.get<string[]>(`${API_ENDPOINTS.doctors}/${id}/availability`, {
            params: { date }
        });
        
        return data;
    },

    async createDoctor(dto: CreateDoctorDto): Promise<Doctor> {
        const { data } = await api.post<Doctor>(API_ENDPOINTS.doctors, dto);
        return data;
    },

    async updateDoctor(id: string, dto: UpdateDoctorDto): Promise<Doctor> {
        const { data } = await api.put<Doctor>(`${API_ENDPOINTS.doctors}/${id}`, dto);
        return data;
    },

    async deleteDoctor(id: string): Promise<void> {
        await api.delete(`${API_ENDPOINTS.doctors}/${id}`);
    }
}