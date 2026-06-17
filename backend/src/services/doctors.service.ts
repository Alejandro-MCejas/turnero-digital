import { Between } from "typeorm"
import { APPOINTMENT_INTERVAL } from "../config/constants"
import { AppDataSource } from "../config/data-source"
import { CreateDoctorDto } from "../dtos/doctor/create-doctor.dto"
import { UpdateDoctorDto } from "../dtos/doctor/update-doctor.dto"
import { Appointment } from "../entities/Appointment"
import { Doctor } from "../entities/Doctor"
import { AppError } from "../utils/AppError"
import { generateTimeSlots } from "../utils/generateTimeSlots"
import { getDayOfWeek } from "../utils/date.utils"


const doctorRepository = AppDataSource.getRepository(Doctor)
const appointmentsRepository = AppDataSource.getRepository(Appointment)

export const getDoctors = async (): Promise<Doctor[]> => {
    return await doctorRepository.find()
}

export const getDoctorById = async (id: string): Promise<Doctor | null> => {
    const doctor = await doctorRepository.findOneBy({ id })

    if (!doctor) throw new AppError("Doctor not found", 404)

    return doctor
}

export const createDoctor = async (dto: CreateDoctorDto): Promise<Doctor> => {
    return await doctorRepository.save(
        doctorRepository.create(dto)
    )
}

export const updateDoctor = async (id: string, dto: UpdateDoctorDto): Promise<Doctor> => {

    const existingDoctor = await doctorRepository.findOne({ where: { id } })

    if (!existingDoctor) throw new AppError("Doctor not found", 404)

    Object.assign(existingDoctor, dto)

    return await doctorRepository.save(existingDoctor)
}

export const deleteDoctor = async (id: string): Promise<void> => {
    const existingDoctor = await doctorRepository.findOneBy({ id })

    if (!existingDoctor) throw new AppError('Doctor not found', 404)

    await doctorRepository.remove(existingDoctor)
}

export const getDoctorAvailability = async (id: string, date: string) => {
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

    const start = new Date(date)
    start.setHours(0, 0, 0, 0)

    const end = new Date(date)
    end.setHours(23, 59, 59, 999)

    const appointments = await appointmentsRepository.find({
        where: {
            doctor: { id },
            date: Between(start, end)
        }
    })

    const occupiedSlots = appointments.map(appointment => appointment.time)

    const freeSlots = availableSlots.filter(slot => !occupiedSlots.includes(slot))

    return freeSlots
}

export const getDoctorAvailableDays = async (id: string) => {
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