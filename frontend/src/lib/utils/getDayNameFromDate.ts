


export function getDayNameFromDate(date: string): string {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [year, month, day] = date.split("-").map(Number);

    return days[new Date(year, month - 1, day).getDay()];
}