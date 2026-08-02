import { schedules } from "@/mocks/schedules";
import ScheduleCard from "../cards/ScheduleCard";
import Button from "../../ui/buttons/Button";
import { Clock, Pencil, Trash } from "lucide-react";
import { Schedule } from "@/types/models/schedule";

interface ScheduleDayProps {
    day: string;
    doctorId: number;
    onEditSchedule: (schedule: Schedule) => void
    onDeleteSchedule: (schedule: Schedule) => void
}

export default function ScheduleDay({ day, doctorId, onEditSchedule, onDeleteSchedule }: ScheduleDayProps) {

    const schedulesOfDay = schedules
        .filter(schedule => schedule.day === day && schedule.doctorId === doctorId)
        .sort((a, b) => a.start.localeCompare(b.start));

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-center font-semibold text-slate-700">{day}</h3>

            <div className="space-y-3">
                {schedulesOfDay.length > 0 ? (
                    schedulesOfDay.map(schedule => (
                        <ScheduleCard
                            key={`${schedule.day}-${schedule.start}`}
                            start={schedule.start}
                            end={schedule.end}
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