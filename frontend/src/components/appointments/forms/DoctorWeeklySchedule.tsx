import Loader from "@/components/ui/feedback/Loader";
import { useDoctorSchedules } from "@/features/schedules/hooks/useDoctorSchedules";
import { DoctorScheduleDay } from "@/types/enums/doctorScheduleDay";


interface DoctorWeeklyScheduleProps {
    doctorId: string
    selectedDate?: string
}

const days: { value: DoctorScheduleDay; label: string }[] = [
    { value: DoctorScheduleDay.MONDAY, label: "Lun" },
    { value: DoctorScheduleDay.TUESDAY, label: "Mar" },
    { value: DoctorScheduleDay.WEDNESDAY, label: "Mié" },
    { value: DoctorScheduleDay.THURSDAY, label: "Jue" },
    { value: DoctorScheduleDay.FRIDAY, label: "Vie" },
    { value: DoctorScheduleDay.SATURDAY, label: "Sáb" },
    { value: DoctorScheduleDay.SUNDAY, label: "Dom" },
]

export default function DoctorWeeklySchedule({ doctorId, selectedDate }: DoctorWeeklyScheduleProps) {

    const { data: schedules = [], isLoading, isError } = useDoctorSchedules(doctorId)

    if (!doctorId) return null;

    const selectedDay = selectedDate
        ? new Date(`${selectedDate}T00:00:00`).getDay()
        : null

    if (isLoading) {
        return (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Horario habitual
                </p>

                <Loader
                    title="Cargando horarios"
                    description="Consultando la disponibilidad del médico..."
                />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-xs text-red-600">
                    No se pudieron cargar los horarios del médico.
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Horario habitual
            </p>

            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
                {days.map((day) => {

                    const daySchedules = schedules.filter(
                        (schedule) => schedule.dayOfWeek === day.value
                    )

                    const isSelected = selectedDay === day.value

                    return (
                        <div
                            key={day.value}
                            className={`
                                rounded-md border bg-white px-1.5 py-1.5 text-center
                                transition-colors
                                ${isSelected
                                    ? "border-violet-500"
                                    : "border-slate-200"
                                }
                            `}
                        >
                            <p className="text-[11px] font-semibold text-slate-600">
                                {day.label}
                            </p>

                            {daySchedules.length > 0 ? (
                                <div className="mt-0.5 space-y-0.5">
                                    {daySchedules.map((schedule) => (
                                        <p
                                            key={schedule.id}
                                            className="text-[11px] font-medium text-slate-700"
                                        >
                                            {schedule.startTime}–{schedule.endTime}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-0.5 text-[11px] text-slate-400">
                                    —
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
