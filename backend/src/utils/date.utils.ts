
export const buildAppointmentDateTime = (date: Date, time: string) => {
    const result = new Date(date)
    const [h, m] = time.split(":")
    result.setHours(Number(h), Number(m), 0, 0)
    return result
}