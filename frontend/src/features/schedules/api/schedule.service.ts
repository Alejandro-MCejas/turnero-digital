import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Schedule } from "@/types/models/schedule";
import { CreateDoctorScheduleDto } from "../dto/createDoctorSchedule.dto";
import { UpdateDoctorScheduleDto } from "../dto/updateDoctorSchedule.dto";


export const scheduleService = {
    async getDoctorSchedules(doctorId: string): Promise<Schedule[]> {
        const { data } = await api.get<Schedule[]>(`${API_ENDPOINTS.doctorSchedules}/doctor/${doctorId}`)

        return data
    },

    async createDoctorSchedule(doctorId: string, dto: CreateDoctorScheduleDto): Promise<Schedule> {
        const { data } = await api.post<Schedule>(`${API_ENDPOINTS.doctorSchedules}/doctor/${doctorId}`, dto)

        return data
    },

    async updateDoctorSchedule(doctorId: string, dto: UpdateDoctorScheduleDto): Promise<Schedule> {
        const { data } = await api.put<Schedule>(`${API_ENDPOINTS.doctorSchedules}/${doctorId}`, dto)

        return data
    },

    async deleteDoctorSchedule(doctorId: string): Promise<void> {
        await api.delete(`${API_ENDPOINTS.doctorSchedules}/${doctorId}`)
    },

}