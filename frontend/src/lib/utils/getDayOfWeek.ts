import { DoctorScheduleDay } from "@/types/enums/doctorScheduleDay"

export function getDayOfWeek(date: string): DoctorScheduleDay {
    const [year, month, day] = date.split("-").map(Number)

    return new Date(year, month - 1, day).getDay() as DoctorScheduleDay
}