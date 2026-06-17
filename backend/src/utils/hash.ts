import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

export const hashToken = async (token: string) => {

    return await bcrypt.hash(token, SALT_ROUNDS)
}

export const compareToken = async (token: string, hash: string) => {
    return await bcrypt.compare(token, hash)
}