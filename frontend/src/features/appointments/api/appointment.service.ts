import api from "@/lib/api/axios"
import { API_ENDPOINTS } from "@/lib/api/endpoints"
import { Appointment } from "@/types/models/appointment"
import { CreateAppointmentDto } from "../dto/createAppointment.dto"
import { UpdateAppointmentDto } from "../dto/updateAppointment.dto"


export const appointmentService = {
    async getAllAppointments(): Promise<Appointment[]> {
        const { data } = await api.get<Appointment[]>(API_ENDPOINTS.appointments)

        return data
    },

    async getMyAppointments(): Promise<Appointment[]> {
        const { data } = await api.get<Appointment[]>(`${API_ENDPOINTS.appointments}/me`)

        return data
    },

    async getAppointmentById(id: string): Promise<Appointment> {
        const { data } = await api.get<Appointment>(`${API_ENDPOINTS.appointments}/${id}`)

        return data
    },

    async createAppointment(dto: CreateAppointmentDto): Promise<Appointment> {
        const { data } = await api.post<Appointment>(API_ENDPOINTS.appointments, dto)

        return data
    },

    async updateAppointment(id: string, dto: UpdateAppointmentDto): Promise<Appointment> {
        const { data } = await api.put<Appointment>(`${API_ENDPOINTS.appointments}/${id}`, dto)

        return data
    },

    async deleteAppointment(id: string): Promise<void> {
        await api.delete(`${API_ENDPOINTS.appointments}/${id}`)
    }
}