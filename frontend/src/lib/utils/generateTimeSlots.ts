export function generateTimeSlots(start: string, end: string, duration: number): string[] {
    const slots: string[] = [];

    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    let currentMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    while (currentMinutes < endMinutes) {

        const hour = Math.floor(currentMinutes / 60)
            .toString()
            .padStart(2, "0");

        const minute = (currentMinutes % 60)
            .toString()
            .padStart(2, "0");

        slots.push(`${hour}:${minute}`);

        currentMinutes += duration;
    }

    return slots;
}