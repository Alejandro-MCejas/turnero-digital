import { Request, Response } from "express";
import {
    getUsers as getUsersService,
    getCurrentUser as getCurrentUserService,
    getUserById as getUserByIdService,
    updateUserRole as updateUserRoleService,
    updateCurrentUser as updateCurrentUserService,
    updateUser as updateUserService,
    deleteUser as deleteUserService,
} from "../services/user.service";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UpdateUserRoleDto } from "../dtos/user/update-user-role.dto";


export const getUsers = async (req: Request, res: Response) => {
    return res.status(200).json(await getUsersService())
}

export const getCurrentUser = async (req: Request, res: Response) => {
    return res.status(200).json(await getCurrentUserService(req.user!.id))
}


export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    return res.status(200).json(await getUserByIdService(id))
}

export const updateUser = async (req: Request<{ id: string }, {}, UpdateUserDto>, res: Response) => {
    const dto = req.body

    const { id } = req.params
    const updatedUser = await updateUserService(id, dto)

    return res.status(200).json(updatedUser)
}

export const updateCurrentUser = async (req: Request<{}, {}, UpdateUserDto>, res: Response) => {
    const dto = req.body

    const updatedUser = await updateCurrentUserService(req.user!.id, dto)

    return res.status(200).json(updatedUser)
}

export const updateUserRole = async (req: Request<{ id: string }, {}, UpdateUserRoleDto>, res: Response) => {
    const { id } = req.params
    const { role } = req.body

    return res.status(200).json(await updateUserRoleService(id, role))
}

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    await deleteUserService(id)

    return res.status(204).send()
}