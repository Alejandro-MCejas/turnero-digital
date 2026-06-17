
export const buildAppointmentDateTime = (date: Date, time: string) => {
    const result = new Date(date)
    const [h, m] = time.split(":")
    result.setHours(Number(h), Number(m), 0, 0)
    return result
}

export const getDayOfWeek = (date: string): number => {
    const [year, month, day] = date.split("-").map(Number) as [number, number, number]

    return new Date(year, month - 1, day).getDay()
}