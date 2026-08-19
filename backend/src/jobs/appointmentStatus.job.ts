import cron from "node-cron"
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { AppointmentStatus } from "../enums/AppointmentStatus";
import { buildAppointmentDateTime, parseDateOnly } from "../utils/date.utils";


const appointmentRepository = AppDataSource.getRepository(Appointment)

const updateExpiredAppointments = async (): Promise<void> => {
    const appointments = await appointmentRepository.find({
        where: [
            { status: AppointmentStatus.PENDING },
            { status: AppointmentStatus.CONFIRMED }
        ]
    })

    const now = new Date()

    const expiredAppointments = appointments.filter(appointment => {
        const appointmentDateTime = buildAppointmentDateTime(
            parseDateOnly(appointment.date),
            appointment.time
        )

        return appointmentDateTime < now
    })

    if (expiredAppointments.length === 0) return

    for (const appointment of expiredAppointments) {
        appointment.status = AppointmentStatus.COMPLETED
    }

    await appointmentRepository.save(expiredAppointments)

    console.log(`${expiredAppointments.length} turno(s) actualizado(s) a completado`);
}

export const startAppointmentStatusJob = () => {
    cron.schedule("*/5 * * * *", async () => {
        try {
            await updateExpiredAppointments()
        } catch (error) {
            console.error("Error al actualizar el estado de los turnos:", error)
        }
    })

    console.log("Job de actualización de turnos iniciado");
}