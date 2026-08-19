export function buildDateTime(date: string, time: string): Date {
    const dateOnly = date.split("T")[0]
    return new Date(`${dateOnly}T${time}`)
}