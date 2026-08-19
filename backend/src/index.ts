import app from './server'
import { ENV } from './config/env'
import { AppDataSource } from './config/data-source'
import { startAppointmentStatusJob } from './jobs/appointmentStatus.job'


const startServer = () => {
    app.listen(ENV.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${ENV.PORT}`)
    })
}

const initializeServer = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Conexión a la base de datos establecida")
        startAppointmentStatusJob()
        startServer()
    } catch (error) {
        console.error("Error al inicializar el servidor:", error)
        process.exit(1)
    }
}

initializeServer()