import { Between, Not } from "typeorm"
import { APPOINTMENT_INTERVAL } from "../config/constants"
import { AppDataSource } from "../config/data-source"
import { CreateDoctorDto } from "../dtos/doctor/create-doctor.dto"
import { UpdateDoctorDto } from "../dtos/doctor/update-doctor.dto"
import { Appointment } from "../entities/Appointment"
import { Doctor } from "../entities/Doctor"
import { AppError } from "../utils/AppError"
import { generateTimeSlots } from "../utils/generateTimeSlots"
import { getDayOfWeek, parseDateOnly } from "../utils/date.utils"
import { AppointmentStatus } from "../enums/AppointmentStatus"


const doctorRepository = AppDataSource.getRepository(Doctor)
const appointmentsRepository = AppDataSource.getRepository(Appointment)

export const getDoctors = async (): Promise<Doctor[]> => {
    return await doctorRepository.find()
}

export const getDoctorById = async (id: string): Promise<Doctor> => {
    const doctor = await doctorRepository.findOneBy({ id })

    if (!doctor) throw new AppError("Doctor not found", 404)

    return doctor
}

export const createDoctor = async (dto: CreateDoctorDto): Promise<Doctor> => {

    const existingDoctor = await doctorRepository.findOne({
        where: { name: dto.name }
    })

    if (existingDoctor) throw new AppError("Doctor already exists", 400)

    return await doctorRepository.save(
        doctorRepository.create(dto)
    )
}

export const updateDoctor = async (id: string, dto: UpdateDoctorDto): Promise<Doctor> => {

    const existingDoctor = await doctorRepository.findOne({ where: { id } })

    if (!existingDoctor) throw new AppError("Doctor not found", 404)

    if (dto.name) {
        const doctorWithSameName = await doctorRepository.findOne({
            where: { name: dto.name }
        })

        if (doctorWithSameName && doctorWithSameName.id !== id) throw new AppError("Doctor already exists", 400)
    }

    Object.assign(existingDoctor, dto)

    return await doctorRepository.save(existingDoctor)
}

export const deleteDoctor = async (id: string): Promise<void> => {
    const existingDoctor = await doctorRepository.findOneBy({ id })

    if (!existingDoctor) throw new AppError('Doctor not found', 404)

    const appointments = await appointmentsRepository.count({ where: { doctor: { id } } })

    if (appointments > 0) throw new AppError('Cannot delete doctor with associated appointments', 400)

    await doctorRepository.remove(existingDoctor)
}

export const getDoctorAvailability = async (id: string, date: string): Promise<string[]> => {
    if (!date) throw new AppError('Date is required', 400)

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new AppError("Invalid date format. Use YYYY-MM-DD", 400)

    const doctor = await doctorRepository.findOne({
        where: { id },
        relations: {
            schedules: true,
        }
    })

    if (!doctor) throw new AppError('Doctor not found', 404)

    const dayOfWeek = getDayOfWeek(date)

    const schedules = doctor.schedules.filter(schedule => schedule.dayOfWeek === dayOfWeek)

    const availableSlots: string[] = []

    for (const schedule of schedules) {
        availableSlots.push(...generateTimeSlots(schedule.startTime, schedule.endTime, APPOINTMENT_INTERVAL))
    }

    const start = parseDateOnly(date)

    const end = parseDateOnly(date)
    end.setHours(23, 59, 59, 999)

    const appointments = await appointmentsRepository.find({
        where: {
            doctor: { id },
            date: Between(start, end),
            status: Not(AppointmentStatus.CANCELLED)
        }
    })

    const occupiedSlots = appointments.map(appointment => appointment.time)

    const freeSlots = availableSlots.filter(slot => !occupiedSlots.includes(slot))

    return freeSlots
}

export const getDoctorAvailableDays = async (id: string): Promise<number[]> => {
    const doctor = await doctorRepository.findOne({
        where: { id },
        relations: {
            schedules: true
        }
    })

    if (!doctor) throw new AppError('Doctor not found', 404)

    const days = doctor.schedules.map(schedule => schedule.dayOfWeek)

    const uniqueDays = new Set(days)

    return Array.from(uniqueDays)
}