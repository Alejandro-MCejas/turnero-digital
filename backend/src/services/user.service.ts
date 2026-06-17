import { AppDataSource } from "../config/data-source"
import { UpdateUserDto } from "../dtos/user/update-user.dto"
import { User } from "../entities/User"
import { UserRole } from "../enums/UserRole"
import { AppError } from "../utils/AppError"


const userRepository = AppDataSource.getRepository(User)

export const getUsers = async (): Promise<User[]> => {
    return await userRepository.find()
}

export const getCurrentUser = async (id: string) => {
    const user = await userRepository.findOne({ where: { id } })
    if (!user) throw new AppError('User not found', 404)

    return user
}

export const getUserById = async (id: string): Promise<User | null> => {
    return await userRepository.findOne({ where: { id } })
}

export const updateUser = async (id: string, user: UpdateUserDto) => {
    const existingUser = await userRepository.findOne({ where: { id } })

    if (!existingUser) throw new AppError('User not found', 404)

    Object.assign(existingUser, user)

    return await userRepository.save(existingUser)
}

export const updateUserRole = async (id: string, role: UserRole) => {
    const user = await userRepository.findOne({ where: { id } })
    if (!user) throw new AppError('User not found', 404)

    if (user.role === role) throw new AppError(`User already has the role ${role}`, 400)

    user.role = role

    return await userRepository.save(user)
}

export const deleteUser = async (id: string) => {
    const existingUser = await userRepository.findOne({ where: { id } })

    if (!existingUser) throw new AppError('User not found', 404)

    return await userRepository.remove(existingUser)
}