import ScheduleCard from "../cards/ScheduleCard";
import Button from "../../ui/buttons/Button";
import { Clock, Pencil, Trash } from "lucide-react";
import { Schedule } from "@/types/models/schedule";
import { DoctorScheduleDay } from "@/types/enums/doctorScheduleDay";

interface ScheduleDayProps {
    day: string;
    schedules: Schedule[]
    onEditSchedule: (schedule: Schedule) => void
    onDeleteSchedule: (schedule: Schedule) => void
}

const dayMap: Record<string, DoctorScheduleDay> = {
    "Lunes": DoctorScheduleDay.MONDAY,
    "Martes": DoctorScheduleDay.TUESDAY,
    "Miércoles": DoctorScheduleDay.WEDNESDAY,
    "Jueves": DoctorScheduleDay.THURSDAY,
    "Viernes": DoctorScheduleDay.FRIDAY,
    "Sábado": DoctorScheduleDay.SATURDAY,
    "Domingo": DoctorScheduleDay.SUNDAY
}

export default function ScheduleDay({ day, schedules, onEditSchedule, onDeleteSchedule }: ScheduleDayProps) {

    const schedulesOfDay = schedules.filter(schedule => schedule.dayOfWeek === dayMap[day])
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-center font-semibold text-slate-700">{day}</h3>

            <div className="space-y-3">
                {schedulesOfDay.length > 0 ? (
                    schedulesOfDay.map(schedule => (
                        <ScheduleCard
                            key={schedule.id}
                            start={schedule.startTime}
                            end={schedule.endTime}
                            actionsClassName="flex justify-center gap-2"
                        >
                            <Button variant="secondary" onClick={() => onEditSchedule(schedule)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>

                            <Button variant="danger" onClick={() => onDeleteSchedule(schedule)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </ScheduleCard>
                    ))
                ) : (
                    <div className="py-8 text-center">
                        <Clock className="mx-auto mb-2 h-6 w-6 text-slate-300" />

                        <p className="text-sm text-slate-400">
                            Sin horarios
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}