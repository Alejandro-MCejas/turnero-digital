import { Schedule } from "@/types/models/schedule"
import ScheduleDayCard from "../cards/ScheduleDayCard";


const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

interface ScheduleMobileProps {
    doctorId: number
    onEditSchedule: (schedule: Schedule) => void
    onDeleteSchedule: (schedule: Schedule) => void
}

export default function ScheduleMobile({ doctorId, onEditSchedule, onDeleteSchedule }: ScheduleMobileProps) {
    return (
        <div className="space-y-4">

            {days.map(day => (
                <ScheduleDayCard
                    key={day}
                    day={day}
                    doctorId={doctorId}
                    onEditSchedule={onEditSchedule}
                    onDeleteSchedule={onDeleteSchedule}
                />
            ))}

        </div>
    )
}