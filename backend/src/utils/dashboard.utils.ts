import { Appointment } from "../entities/Appointment"
import { AppointmentStatus } from "../enums/AppointmentStatus"
import { parseDateOnly } from "./date.utils"

export const getAppointmentsByStatus = (appointments: Appointment[]) => {
    return appointments.reduce((acc, appt) => {
        acc[appt.status]++
        return acc
    }, {
        confirmed: 0,
        pending: 0,
        cancelled: 0,
        completed: 0
    })
}

export const getAppointmentsByWeek = (appointments: Appointment[], startOfWeek: Date, endOfWeek: Date) => {

    const byDayMap: Record<string, number> = {}

    const currentDate = new Date(startOfWeek)

    while (currentDate <= endOfWeek) {

        const key = [
            currentDate.getFullYear(),
            String(currentDate.getMonth() + 1).padStart(2, "0"),
            String(currentDate.getDate()).padStart(2, "0")
        ].join("-")

        byDayMap[key] = 0

        currentDate.setDate(currentDate.getDate() + 1)
    }

    appointments.forEach(appt => {

        const date = parseDateOnly(appt.date)

        if (date >= startOfWeek && date <= endOfWeek) {

            const key = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0")
            ].join("-")

            byDayMap[key] = (byDayMap[key] ?? 0) + 1
        }
    })

    return Object.entries(byDayMap)
        .map(([date, count]) => ({
            date,
            count
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
}

export const getTodayAppointments = (appointments: Appointment[], startOfDay: Date, endOfDay: Date) => {
    return appointments
        .filter(appt => {

            const date = parseDateOnly(appt.date)

            return (
                date >= startOfDay &&
                date <= endOfDay &&
                (
                    appt.status === AppointmentStatus.PENDING ||
                    appt.status === AppointmentStatus.CONFIRMED
                )
            )
        })
        .sort((a, b) => a.time.localeCompare(b.time))
}

export const getTodayAppointmentsPreview = (appointments: Appointment[], startOfDay: Date, endOfDay: Date) => {
    return getTodayAppointments(appointments, startOfDay, endOfDay).slice(0, 4)
}

export const getUpcomingAppointments = (appointments: Appointment[], startOfWeek: Date, endOfWeek: Date) => {
    return appointments
        .filter(appt => {

            const date = parseDateOnly(appt.date)

            return (
                date >= startOfWeek &&
                date <= endOfWeek &&
                appt.status !== AppointmentStatus.CANCELLED &&
                appt.status !== AppointmentStatus.COMPLETED
            )
        })
        .sort((a, b) => {

            const dateA = parseDateOnly(a.date)
            const dateB = parseDateOnly(b.date)

            const dateDifference =
                dateA.getTime() - dateB.getTime()

            if (dateDifference !== 0) {
                return dateDifference
            }

            return a.time.localeCompare(b.time)
        })
}