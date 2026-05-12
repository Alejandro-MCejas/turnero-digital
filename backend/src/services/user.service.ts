import { AppDataSource } from "../config/data-source"
import { UpdateUserDto } from "../dtos/user/update-user.dto"
import { CreateUserDto } from "../dtos/user/create-user.dto"
import { User } from "../entities/User"


const userRepository = AppDataSource.getRepository(User)

export const getUsers = async (): Promise<User[]> => {
    return await userRepository.find()
}

export const getUserById = async (id: string): Promise<User | null> => {
    return await userRepository.findOne({ where: { id } })
}

export const createUser = async (user: CreateUserDto) => {
    return await userRepository.save(
        userRepository.create(user)
    )
}

export const updateUser = async (id: string, user: UpdateUserDto) => {
    const existingUser = await userRepository.findOne({ where: { id } })

    if (!existingUser) throw new Error('User not found')

    Object.assign(existingUser, user)

    return await userRepository.save(existingUser)
}

export const deleteUser = async (id: string) => {
    const existingUser = await userRepository.findOne({ where: { id } })

    if (!existingUser) throw new Error('User not found')

    return await userRepository.remove(existingUser)
}