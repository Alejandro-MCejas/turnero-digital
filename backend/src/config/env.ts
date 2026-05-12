import "dotenv/config"

function getEnv(name: string) {
    const value = process.env[name]
    if(!value) throw new Error(`Falta la variable de entorno ${name}`)
    return value
}

export const ENV = {
    PORT: process.env.PORT || 3000,
    DB_HOST: getEnv("DB_HOST"),
    DB_PORT: Number(getEnv("DB_PORT")),
    DB_USERNAME: getEnv("DB_USERNAME"),
    DB_PASSWORD: getEnv("DB_PASSWORD"),
    DB_NAME: getEnv("DB_NAME")
}