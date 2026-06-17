import { AppDataSource } from "../config/data-source"
import { CreateDoctorScheduleDto } from "../dtos/doctorSchedule/create-doctorSchedule.dto"
import { UpdateDoctorScheduleDto } from "../dtos/doctorSchedule/update-doctorSchedule.dto"
import { Doctor } from "../entities/Doctor"
import { DoctorSchedule } from "../entities/DoctorSchedule"
import { AppError } from "../utils/AppError"


const doctorRepository = AppDataSource.getRepository(Doctor)
const doctorSchedulesRepository = AppDataSource.getRepository(DoctorSchedule)


export const getDoctorSchedulesByDoctorId = async (doctorId: string) => {
    return await doctorSchedulesRepository.find({ where: { doctor: { id: doctorId } } })
}

export const createDoctorSchedule = async (doctorId: string, dto: CreateDoctorScheduleDto) => {
    const doctor = await doctorRepository.findOneBy({ id: doctorId })

    if (!doctor) throw new AppError("Doctor not found", 404)

    if (dto.startTime >= dto.endTime) throw new AppError("startTime must be earlier than endTime", 400)

    const schedules = await doctorSchedulesRepository.find({
        where: {
            doctor: { id: doctorId },
            dayOfWeek: dto.dayOfWeek
        }
    })

    for (const schedule of schedules) {
        const overlaps =
            dto.startTime < schedule.endTime && dto.endTime > schedule.startTime

        if (overlaps) throw new AppError("Schedule overlaps with an existing schedule", 400)
    }

    const schedule = doctorSchedulesRepository.create({
        ...dto,
        doctor
    })

    return await doctorSchedulesRepository.save(schedule)
}

export const updateDoctorSchedule = async (id: string, dto: UpdateDoctorScheduleDto) => {
    const existingSchedule = await doctorSchedulesRepository.findOne({
        where: { id },
        relations: {
            doctor: true
        }
    })

    if (!existingSchedule) throw new AppError("Doctor schedule not found", 404)

    const startTime = dto.startTime ?? existingSchedule.startTime
    const endTime = dto.endTime ?? existingSchedule.endTime
    const dayOfWeek = dto.dayOfWeek ?? existingSchedule.dayOfWeek

    if (startTime >= endTime) throw new AppError('startTime must be earlier than endTime', 400)

    const schedules = await doctorSchedulesRepository.find({
        where: {
            doctor: { id: existingSchedule.doctor.id },
            dayOfWeek
        }
    })

    for (const schedule of schedules) {
        if(schedule.id === existingSchedule.id) continue

        const overlaps = startTime < schedule.endTime && endTime > schedule.startTime

        if (overlaps) throw new AppError("Schedule overlaps with an existing schedule", 400)
    }

    Object.assign(existingSchedule, dto)

    return await doctorSchedulesRepository.save(existingSchedule)
}

export const deleteDoctorSchedule = async (id: string) => {
    const existingSchedule = await doctorSchedulesRepository.findOneBy({ id })

    if (!existingSchedule) throw new AppError("Doctor schedule not found", 404)

    await doctorSchedulesRepository.remove(existingSchedule)
}