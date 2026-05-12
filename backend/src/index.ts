import app from './server'
import { ENV } from './config/env'
import { AppDataSource } from './config/data-source'


const startServer = () => {
    app.listen(ENV.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${ENV.PORT}`)
    })
}

const initializeServer = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Conexión a la base de datos establecida")
        startServer()
    } catch (error) {
        console.error("Error al inicializar el servidor:", error)
        process.exit(1)
    }
}

initializeServer()