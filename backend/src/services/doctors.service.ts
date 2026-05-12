import { AppDataSource } from "../config/data-source"
import { CreateDoctorDto } from "../dtos/doctor/create-doctor.dto"
import { UpdateDoctorDto } from "../dtos/doctor/update-doctor.dto"
import { Doctor } from "../entities/Doctor"
import { AppError } from "../utils/AppError"


const doctorRepository = AppDataSource.getRepository(Doctor)

export const getDoctors = async (): Promise<Doctor[]> => {
    return await doctorRepository.find()
}

export const getDoctorById = async (id: string): Promise<Doctor | null> => {
    return await doctorRepository.findOneBy({ id })

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

export const deleteDoctor = async (id: string) => {
    const existingDoctor = await doctorRepository.findOneBy({ id })

    if (!existingDoctor) throw new AppError('Doctor not found', 404)

    return await doctorRepository.remove(existingDoctor)


}