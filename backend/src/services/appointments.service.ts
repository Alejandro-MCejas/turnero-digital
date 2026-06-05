import { Between } from "typeorm"
import { AppDataSource } from "../config/data-source"
import { CreateAppointmentDto } from "../dtos/appointment/create-appointment.dto"
import { UpdateAppointmentDto } from "../dtos/appointment/update-appointment.dto"
import { Appointment } from "../entities/Appointment"
import { AppError } from "../utils/AppError"
import { Doctor } from "../entities/Doctor"
import { AppointmentStatus } from "../enums/AppointmentStatus"
import { User } from "../entities/User"
import { buildAppointmentDateTime } from "../utils/date.utils"


const appointmentRepository = AppDataSource.getRepository(Appointment)
const doctorRepository = AppDataSource.getRepository(Doctor)
const userRepository = AppDataSource.getRepository(User)

export const getAppointments = async () => {
    return appointmentRepository.find()
}

export const getAppointmentById = async (id: string) => {
    const appointment = await appointmentRepository.findOne({ where: { id } })

    if (!appointment) throw new AppError("Appointment not found", 404)

    return appointment
}

const mapToAppointment = (dto: CreateAppointmentDto, doctor: Doctor): Partial<Appointment> => {
    return {
        date: new Date(dto.date),
        time: dto.time,
        doctor,
        ...(dto.userId && { user: { id: dto.userId } as any }),
        ...(dto.guestName && { guestName: dto.guestName }),
        ...(dto.guestEmail && { guestEmail: dto.guestEmail })
    }
}

export const createAppointment = async (dto: CreateAppointmentDto) => {

    const appointmentDate = new Date(dto.date)

    if (appointmentDate < new Date()) throw new AppError('You cannot create an appointment in the past', 400)

    if (dto.userId && (dto.guestName || dto.guestEmail)) throw new AppError("You cannot provide userId and guest data at the same time", 400)
    if (!dto.userId && (!dto.guestName || !dto.guestEmail)) throw new AppError("Guest must provide both name and email", 400)

    const doctor = await doctorRepository.findOne({ where: { id: dto.doctorId } })

    if (!doctor) throw new AppError('Doctor not found', 404)

    if (dto.userId) {
        const user = await userRepository.findOne({ where: { id: dto.userId } })
        if (!user) throw new AppError('User not found', 404)
    }

    const start = new Date(dto.date)
    start.setHours(0, 0, 0, 0)

    const end = new Date(dto.date)
    end.setHours(23, 59, 59, 999)

    const existingAppointment = await appointmentRepository.findOne({
        where: {
            doctor: { id: dto.doctorId },
            date: Between(start, end),
            time: dto.time
        }
    })

    if (existingAppointment) throw new AppError('This doctor already has an appointment at the specified date and time', 400)

    const appointment = appointmentRepository.create(mapToAppointment(dto, doctor))

    try {
        return await appointmentRepository.save(appointment)
    } catch (error: any) {
        if (error.code === '23505') {
            throw new AppError('This doctor already has an appointment at that time', 400)
        }
        throw error
    }

}

export const updateAppointment = async (id: string, dto: UpdateAppointmentDto) => {
    const existingAppointment = await appointmentRepository.findOne({ where: { id } })

    if (!existingAppointment) throw new AppError("Appointment not found", 404)
    if (existingAppointment.status === AppointmentStatus.CANCELLED) throw new AppError("Cannot modify a cancelled appointment", 400)

    if (dto.status === AppointmentStatus.CANCELLED) {

        const appointmentDateTime = buildAppointmentDateTime(existingAppointment.date, existingAppointment.time)
        const now = new Date()
        const diffInMs = appointmentDateTime.getTime() - now.getTime()
        const diffInHours = diffInMs / (1000 * 60 * 60)

        if (diffInHours < 24) throw new AppError("You cannot cancel an appointment with less than 24 hours notice", 400)
    }

    if (dto.date) existingAppointment.date = new Date(dto.date)
    if (dto.time) existingAppointment.time = dto.time
    if (dto.status) existingAppointment.status = dto.status

    return await appointmentRepository.save(existingAppointment)
}

export const deleteAppointment = async (id: string) => {
    const existingAppointment = await appointmentRepository.findOne({ where: { id } })

    if (!existingAppointment) throw new AppError("Appointment not found", 404)

    existingAppointment.status = AppointmentStatus.CANCELLED

    return await appointmentRepository.save(existingAppointment)
}