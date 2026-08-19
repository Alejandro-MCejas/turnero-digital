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
    schedules: Schedule[]
    onEditSchedule: (schedule: Schedule) => void
    onDeleteSchedule: (schedule: Schedule) => void
}

export default function ScheduleMobile({ schedules, onEditSchedule, onDeleteSchedule }: ScheduleMobileProps) {
    return (
        <div className="space-y-4">

            {days.map(day => (
                <ScheduleDayCard
                    key={day}
                    day={day}
                    schedules={schedules}
                    onEditSchedule={onEditSchedule}
                    onDeleteSchedule={onDeleteSchedule}
                />
            ))}

        </div>
    )
}