import { Schedule } from "@/types/models/schedule";
import ScheduleDay from "./ScheduleDay";

const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
];

interface ScheduleGridProps {
    doctorId: number;
    onEditSchedule: (schedule: Schedule) => void;
    onDeleteSchedule: (schedule: Schedule) => void;
}

export default function ScheduleGrid({ doctorId, onEditSchedule, onDeleteSchedule }: ScheduleGridProps) {
    return (
        <div className="grid grid-cols-7 gap-2">
            {days.map(day => (
                <ScheduleDay 
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