import { AppDataSource } from "../config/data-source"
import { CreateAppointmentDto } from "../dtos/appointment/create-appointment.dto"
import { UpdateAppointmentDto } from "../dtos/appointment/update-appointment.dto"
import { Appointment } from "../entities/Appointment"
import { AppError } from "../utils/AppError"

const appointmentRepository = AppDataSource.getRepository(Appointment)

export const getAppointments = async () => {
    return appointmentRepository.find()
}

export const getAppointmentById = async (id: string) => {
    const appointment = await appointmentRepository.findOne({ where: { id } })

    if (!appointment) throw new AppError("Appointment not found", 404)

    return appointment
}

export const createAppointment = async (dto: CreateAppointmentDto) => {
    return await appointmentRepository.save(appointmentRepository.create(dto))
}

export const updateAppointment = async (id: string, dto: UpdateAppointmentDto) => {
    const existingAppointment = await appointmentRepository.findOne({ where: { id } })

    if (!existingAppointment) throw new AppError("Appointment not found", 404)

    Object.assign(existingAppointment, dto)

    return await appointmentRepository.save(existingAppointment)
}

export const deleteAppointment = async (id: string) => {
    const existingAppointment = await appointmentRepository.findOne({ where: { id } })

    if (!existingAppointment) throw new AppError("Appointment not found", 404)

    return await appointmentRepository.remove(existingAppointment)
}