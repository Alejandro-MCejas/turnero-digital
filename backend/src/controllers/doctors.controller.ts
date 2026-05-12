import { Request, Response } from "express";
import { CreateDoctorDto } from "../dtos/doctor/create-doctor.dto";
import { UpdateDoctorDto } from "../dtos/doctor/update-doctor.dto";
import {
    getDoctors as getDoctorsService,
    getDoctorById as getDoctorByIdService,
    createDoctor as createDoctorService,
    updateDoctor as updateDoctorService,
    deleteDoctor as deleteDoctorService
} from "../services/doctors.service"




export const getDoctors = async (req: Request, res: Response) => {
    return res.status(200).json(await getDoctorsService())
}

export const getDoctorById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    return res.status(200).json(await getDoctorByIdService(id))
}

export const createDoctor = async (req: Request<{}, {}, CreateDoctorDto>, res: Response) => {
    const dto = req.body

    return res.status(201).json(await createDoctorService(dto))

}

export const updateDoctor = async (req: Request<{ id: string }, {}, UpdateDoctorDto>, res: Response) => {
    const dto = req.body

    const { id } = req.params

    return res.status(200).json(await updateDoctorService(id, dto))
}

export const deleteDoctor = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    await deleteDoctorService(id)

    return res.status(204).send()

}