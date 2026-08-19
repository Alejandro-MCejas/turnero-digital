import { Between, Not } from "typeorm"
import { AppDataSource } from "../config/data-source"
import { CreateAppointmentDto } from "../dtos/appointment/create-appointment.dto"
import { UpdateAppointmentDto } from "../dtos/appointment/update-appointment.dto"
import { Appointment } from "../entities/Appointment"
import { AppError } from "../utils/AppError"
import { Doctor } from "../entities/Doctor"
import { AppointmentStatus } from "../enums/AppointmentStatus"
import { User } from "../entities/User"
import { buildAppointmentDateTime, getDayOfWeek, parseDateOnly } from "../utils/date.utils"
import { DoctorSchedule } from "../entities/DoctorSchedule"
import { UserRole } from "../enums/UserRole"


const appointmentRepository = AppDataSource.getRepository(Appointment)
const doctorRepository = AppDataSource.getRepository(Doctor)
const userRepository = AppDataSource.getRepository(User)
const doctorScheduleRepository = AppDataSource.getRepository(DoctorSchedule)

export const getAppointments = async (): Promise<Appointment[]> => {
    const appointments = await appointmentRepository.find({
        relations: {
            user: true,
            doctor: true
        }
    })

    return appointments.sort((a, b) => {
        const aCancelled = a.status === AppointmentStatus.CANCELLED
        const bCancelled = b.status === AppointmentStatus.CANCELLED

        if (aCancelled && !bCancelled) return 1
        if (!aCancelled && bCancelled) return -1

        return 0
    })
}

export const getMyAppointments = async (userId: string): Promise<Appointment[]> => {
    return appointmentRepository.find({
        where: {
            user: { id: userId },
        },
        relations: {
            doctor: true
        }
    })


}

export const getAppointmentById = async (id: string): Promise<Appointment> => {
    const appointment = await appointmentRepository.findOne({
        where: { id },
        relations: {
            user: true,
            doctor: true
        }
    })

    if (!appointment) throw new AppError("Appointment not found", 404)

    return appointment
}

const mapToAppointment = (dto: CreateAppointmentDto, doctor: Doctor, user: User): Partial<Appointment> => {
    return {
        date: parseDateOnly(dto.date),
        time: dto.time,
        status: AppointmentStatus.PENDING,
        doctor,
        user
    }
}

export const createAppointment = async (dto: CreateAppointmentDto, authenticatedUserId: string, role: UserRole): Promise<Appointment> => {

    const appointmentDate = parseDateOnly(dto.date)
    const appointmentDateTime = buildAppointmentDateTime(appointmentDate, dto.time)

    const dayOfWeek = getDayOfWeek(dto.date)

    if (appointmentDateTime < new Date()) throw new AppError('You cannot create an appointment in the past', 400)

    const doctor = await doctorRepository.findOne({ where: { id: dto.doctorId } })

    if (!doctor) throw new AppError('Doctor not found', 404)

    const userId = role === UserRole.ADMIN && dto.userId ? dto.userId : authenticatedUserId

    const user = await userRepository.findOne({ where: { id: userId } })

    if (!user) throw new AppError('User not found', 404)

    const schedules = await doctorScheduleRepository.find({
        where: {
            doctor: { id: dto.doctorId },
            dayOfWeek
        }
    })

    if (schedules.length === 0) throw new AppError("Doctor is not available on this day", 400)

    const isWithinSchedule = schedules.some(schedule => {
        return dto.time >= schedule.startTime && dto.time < schedule.endTime
    })

    if (!isWithinSchedule) throw new AppError("Appointment is outside doctor's working hours", 400)

    const start = parseDateOnly(dto.date)

    const end = new Date(dto.date)
    end.setHours(23, 59, 59, 999)

    const existingAppointment = await appointmentRepository.findOne({
        where: {
            doctor: { id: dto.doctorId },
            date: Between(start, end),
            time: dto.time,
            status: Not(AppointmentStatus.CANCELLED)
        }
    })

    if (existingAppointment) throw new AppError('This doctor already has an appointment at the specified date and time', 400)

    const appointment = appointmentRepository.create(mapToAppointment(dto, doctor, user))

    try {
        return await appointmentRepository.save(appointment)
    } catch (error: any) {
        if (error.code === '23505') {
            throw new AppError('This doctor already has an appointment at that time', 400)
        }
        throw error
    }

}

export const updateAppointment = async (id: string, dto: UpdateAppointmentDto, userId: string, role: UserRole): Promise<Appointment> => {
    const existingAppointment = await appointmentRepository.findOne({
        where: { id },
        relations: { user: true, doctor: true }
    })

    if (!existingAppointment) throw new AppError("Appointment not found", 404)

    if (role !== UserRole.ADMIN && existingAppointment.user?.id !== userId) throw new AppError("Forbidden", 403)

    if (existingAppointment.status === AppointmentStatus.CANCELLED) throw new AppError("Cannot modify a cancelled appointment", 400)

    if (dto.status && dto.status !== AppointmentStatus.CANCELLED && role !== UserRole.ADMIN) {
        throw new AppError("Only admins can change the appointment status", 403)
    }

    if (dto.status === AppointmentStatus.CANCELLED && role !== UserRole.ADMIN) {

        const appointmentDateTime = buildAppointmentDateTime(parseDateOnly(existingAppointment.date), existingAppointment.time)
        const now = new Date()
        const diffInMs = appointmentDateTime.getTime() - now.getTime()
        const diffInHours = diffInMs / (1000 * 60 * 60)

        if (diffInHours < 24) throw new AppError("You cannot cancel an appointment with less than 24 hours notice", 400)
    }

    const finalDoctorId = dto.doctorId ?? existingAppointment.doctor.id

    const doctor = await doctorRepository.findOne({
        where: { id: finalDoctorId }
    })

    if (!doctor) throw new AppError('Doctor not found', 404)

    const finalDate = dto.date ? parseDateOnly(dto.date) : parseDateOnly(existingAppointment.date)

    const finalTime = dto.time ?? existingAppointment.time

    const appointmentDateTime = buildAppointmentDateTime(finalDate, finalTime)

    if (appointmentDateTime < new Date()) throw new AppError('You cannot set an appointment in the past', 400)

    const dayOfWeek = finalDate.getDay()

    const schedules = await doctorScheduleRepository.find({
        where: {
            doctor: { id: finalDoctorId },
            dayOfWeek
        }
    })

    if (schedules.length === 0) throw new AppError("Doctor is not available on this day", 400)

    const isWithinSchedule = schedules.some(schedule => {
        return (
            finalTime >= schedule.startTime && finalTime < schedule.endTime
        )
    })

    if (!isWithinSchedule) throw new AppError("Appointment is outside doctor's working hours", 400)

    const start = parseDateOnly(finalDate)

    const end = new Date(start)
    end.setHours(23, 59, 59, 999)

    const existingAppointmentAtTime = await appointmentRepository.findOne({
        where: {
            doctor: { id: finalDoctorId },
            date: Between(start, end),
            time: finalTime,
            id: Not(id),
            status: Not(AppointmentStatus.CANCELLED)
        }
    })

    if (existingAppointmentAtTime) {
        throw new AppError('This doctor already has an appointment at the specified date and time', 400)
    }

    existingAppointment.doctor = doctor
    existingAppointment.date = finalDate
    existingAppointment.time = finalTime

    if (dto.status) {
        existingAppointment.status = dto.status
    }

    try {
        return await appointmentRepository.save(existingAppointment)
    } catch (error: any) {
        if (error.code === '23505') {
            throw new AppError('This doctor already has an appointment at that time', 400)
        }

        throw error
    }
}

export const deleteAppointment = async (id: string, userId: string, role: UserRole): Promise<void> => {
    const existingAppointment = await appointmentRepository.findOne({ where: { id }, relations: { user: true } })

    if (!existingAppointment) throw new AppError("Appointment not found", 404)

    if (role !== UserRole.ADMIN && existingAppointment.user?.id !== userId) throw new AppError("Forbidden", 403)

    if (role !== UserRole.ADMIN) {
        const appointmentDateTime = buildAppointmentDateTime(
            parseDateOnly(existingAppointment.date),
            existingAppointment.time
        )

        const now = new Date()

        const diffInMs = appointmentDateTime.getTime() - now.getTime()

        const diffInHours = diffInMs / (1000 * 60 * 60)

        if (diffInHours < 24) throw new AppError("You cannot cancel an appointment with less than 24 hours notice", 400)
    }

    existingAppointment.status = AppointmentStatus.CANCELLED

    await appointmentRepository.save(existingAppointment)
}