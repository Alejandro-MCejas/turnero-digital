import { Schedule } from "@/types/models/schedule"
import Badge from "../../ui/data-display/Badge"
import ScheduleCard from "./ScheduleCard"
import Button from "../../ui/buttons/Button"
import { Clock, Pencil, Trash } from "lucide-react"
import { DoctorScheduleDay } from "@/types/enums/doctorScheduleDay"



interface ScheduleDayCardProps {
    day: string
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
};

export default function ScheduleDayCard({ day, schedules, onEditSchedule, onDeleteSchedule }: ScheduleDayCardProps) {
    const schedulesOfDay = schedules.filter(schedule => schedule.dayOfWeek === dayMap[day])
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

                <h3 className="text-lg font-semibold text-slate-800">
                    {day}
                </h3>

                <Badge
                    variant={schedulesOfDay.length > 0 ? "success" : "secondary"}
                >
                    {schedulesOfDay.length} horario{schedulesOfDay.length !== 1 && "s"}
                </Badge>

            </div>

            {schedulesOfDay.length > 0 ? (

                <div className="space-y-3">

                    {schedulesOfDay.map(schedule => (

                        <ScheduleCard
                            key={schedule.id}
                            start={schedule.startTime}
                            end={schedule.endTime}
                            actionsClassName="flex flex-col gap-2 sm:grid sm:grid-cols-2"
                        >

                            <Button
                                variant="secondary"
                                className="justify-center"
                                onClick={() => onEditSchedule(schedule)}
                            >
                                <Pencil className="h-4 w-4" />
                                Editar
                            </Button>

                            <Button
                                variant="danger"
                                className="justify-center"
                                onClick={() => onDeleteSchedule(schedule)}
                            >
                                <Trash className="h-4 w-4" />
                                Eliminar
                            </Button>

                        </ScheduleCard>

                    ))}

                </div>

            ) : (

                <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 py-8 text-center">

                    <Clock className="mb-3 h-8 w-8 text-slate-300" />

                    <p className="text-sm text-slate-400">
                        Sin horarios disponibles
                    </p>

                </div>

            )}

        </article>
    )
}