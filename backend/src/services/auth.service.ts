import { AppDataSource } from "../config/data-source";
import { LoginDto } from "../dtos/auth/login.dto";
import { RegisterDto } from "../dtos/auth/register.dto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { AppError } from "../utils/AppError";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { compareToken, hashToken } from "../utils/hash";

const userRepository = AppDataSource.getRepository(User)
const credentialRepository = AppDataSource.getRepository(Credential)

export const register = async (dto: RegisterDto) => {
    if (dto.password !== dto.confirmPassword) throw new AppError('Password do not match', 400)

    const existingUser = await userRepository.findOne({ where: { email: dto.email } })

    if (existingUser) throw new AppError("User already exists", 400)

    const hashedPassword = await hashPassword(dto.password)

    const user = userRepository.create({
        name: dto.name,
        email: dto.email,
        birthDate: dto.birthDate,
        nDni: dto.nDni,
    })
    await userRepository.save(user)

    const credential = credentialRepository.create({
        password: hashedPassword,
        user
    })
    await credentialRepository.save(credential)
    return user
}

export const login = async (dto: LoginDto) => {

    const user = await userRepository.findOne({ where: { email: dto.email }, relations: ["credential"] })

    if (!user) throw new AppError("Invalid Credentials", 401)

    const isvalid = await comparePassword(dto.password, user.credential.password)
    if (!isvalid) throw new AppError("Invalid Credentials", 401)

    const accessToken = generateAccessToken({ id: user.id, role: user.role })
    const refreshToken = generateRefreshToken({ id: user.id })

    const hashedRefreshToken = await hashToken(refreshToken)
    user.credential.refreshToken = hashedRefreshToken
    await credentialRepository.save(user.credential)

    return { accessToken, refreshToken }
}

export const refresh = async (refreshToken: string) => {
    if (!refreshToken) throw new AppError("Token is required", 401)

    const decoded = verifyRefreshToken(refreshToken)
    const user = await userRepository.findOne({
        where: { id: decoded.id },
        relations: ["credential"]
    })

    if (!user || user.credential.refreshToken !== refreshToken) throw new AppError("Invalid refresh token", 401)

    const isValid = await compareToken(refreshToken, user.credential.refreshToken)
    if (!isValid) throw new AppError("invalid refresh token", 401)

    const newAccessToken = generateAccessToken({
        id: user.id,
        role: user.role
    })

    const newRefreshToken = generateRefreshToken({
        user: user.id
    })

    const hashed = await hashToken(newRefreshToken)

    user.credential.refreshToken = hashed
    await credentialRepository.save(user.credential)

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}



export const logout = async (userId: string) => {
    const user = await userRepository.findOne({
        where: { id: userId },
        relations: ["credential"]
    })

    if (!user) throw new AppError("User not found", 404)

    user.credential.refreshToken = null
    await credentialRepository.save(user.credential)
}