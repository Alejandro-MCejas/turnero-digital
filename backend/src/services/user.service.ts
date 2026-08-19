import { AppDataSource } from "../config/data-source"
import { UpdateUserDto } from "../dtos/user/update-user.dto"
import { Appointment } from "../entities/Appointment"
import { Credential } from "../entities/Credential"
import { User } from "../entities/User"
import { UserRole } from "../enums/UserRole"
import { AppError } from "../utils/AppError"


const userRepository = AppDataSource.getRepository(User)
const appointmentRepository = AppDataSource.getRepository(Appointment)
const credentialRepository = AppDataSource.getRepository(Credential)

export const getUsers = async (): Promise<User[]> => {
    return await userRepository.find()
}

export const getCurrentUser = async (id: string): Promise<User> => {
    const user = await userRepository.findOne({ where: { id } })
    if (!user) throw new AppError('User not found', 404)

    return user
}

export const updateCurrentUser = async (id: string, dto: UpdateUserDto): Promise<User> => {
    return await updateUser(id, dto)
}

export const getUserById = async (id: string): Promise<User> => {
    const user = await userRepository.findOne({ where: { id } })
    if (!user) throw new AppError('User not found', 404)

    return user
}

export const updateUser = async (id: string, user: UpdateUserDto): Promise<User> => {
    const existingUser = await userRepository.findOne({ where: { id } })

    if (!existingUser) throw new AppError('User not found', 404)

    if (user.email) {
        const existingEmail = await userRepository.findOne({
            where: { email: user.email }
        })

        if (existingEmail && existingEmail.id !== id) throw new AppError('Email already exists', 400)
    }

    Object.assign(existingUser, user)

    return await userRepository.save(existingUser)
}

export const updateUserRole = async (id: string, role: UserRole): Promise<User> => {
    const user = await userRepository.findOne({ where: { id } })
    if (!user) throw new AppError('User not found', 404)

    if (user.role === role) throw new AppError(`User already has the role ${role}`, 400)

    user.role = role

    return await userRepository.save(user)
}

export const deleteUser = async (id: string): Promise<void> => {
    const existingUser = await userRepository.findOne({
        where: { id },
        relations: ["credential"]
    })

    if (!existingUser) throw new AppError('User not found', 404)

    const appointments = await appointmentRepository.count({ where: { user: { id } } })

    if (appointments > 0) throw new AppError('Cannot delete user with associated appointments', 400)

    if (existingUser.credential) {
        await credentialRepository.remove(existingUser.credential)
    }

    await userRepository.remove(existingUser)
}