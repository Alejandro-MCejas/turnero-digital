

export const generateTimeSlots = (startTime: string, endTime: string, interval: number): string[] => {
    const slots: string[] = []

    const [startHour, startMinute] = startTime.split(':').map(Number) as [number, number]
    const [endHour, endMinute] = endTime.split(':').map(Number) as [number, number]

    let currentMinutes = startHour * 60 + startMinute
    const endMinutes = endHour * 60 + endMinute

    while (currentMinutes < endMinutes) {
        const hours = Math.floor(currentMinutes / 60)
        const minutes = currentMinutes % 60

        slots.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`)
        currentMinutes += interval

    }

    return slots
}