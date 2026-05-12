import { Request, Response } from "express";
import {
    getUsers as getUsersService,
    getUserById as getUserByIdService,
    createUser as createUserService,
    updateUser as updateUserService,
    deleteUser as deleteUserService
} from "../services/user.service";
import { UpdateUserDto } from "../dtos/user/update-user.dto";


export const getUsers = async (req: Request, res: Response) => {
    return res.status(200).json(await getUsersService())
}

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    return res.status(200).json(await getUserByIdService(id))
}

export const createUser = async (req: Request, res: Response) => {
    const dto = req.body

    const user = await createUserService(dto)

    return res.status(201).json(user)

}

export const updateUser = async (req: Request<{ id: string }, {}, UpdateUserDto>, res: Response) => {
    const dto = req.body

    const { id } = req.params
    const updatedUser = await updateUserService(id, dto)

    return res.status(200).json(updatedUser)
}

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    await deleteUserService(id)

    return res.status(204).send()
}