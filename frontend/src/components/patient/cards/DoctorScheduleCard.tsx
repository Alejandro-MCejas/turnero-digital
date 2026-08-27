"use client"

import Button from "@/components/ui/buttons/Button";
import { useDoctorSchedules } from "@/features/schedules/hooks/useDoctorSchedules";
import { DoctorScheduleDay } from "@/types/enums/doctorScheduleDay";
import { Doctor } from "@/types/models/doctor"
import { Stethoscope } from "lucide-react";
import Link from "next/link";

interface DoctorScheduleCardProps {
    doctor: Doctor
}

const days: { value: DoctorScheduleDay; label: string }[] = [
    { value: DoctorScheduleDay.MONDAY, label: "Lunes" },
    { value: DoctorScheduleDay.TUESDAY, label: "Martes" },
    { value: DoctorScheduleDay.WEDNESDAY, label: "Miércoles" },
    { value: DoctorScheduleDay.THURSDAY, label: "Jueves" },
    { value: DoctorScheduleDay.FRIDAY, label: "Viernes" },
    { value: DoctorScheduleDay.SATURDAY, label: "Sábado" },
    { value: DoctorScheduleDay.SUNDAY, label: "Domingo" },
]

export default function DoctorScheduleCard({ doctor }: DoctorScheduleCardProps) {

    const { data: schedules = [], isLoading, isError } = useDoctorSchedules(doctor.id)

    return (
        <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                    <Stethoscope className="h-5 w-5 text-violet-600" />
                </div>

                <div>
                    <h2 className="font-semibold text-slate-900">
                        {doctor.name}
                    </h2>

                    <p className="text-sm text-slate-500">
                        {doctor.specialty}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex-1">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Horarios de atención
                </p>

                {isLoading ? (
                    <p className="text-sm text-slate-400">
                        Cargando horarios...
                    </p>
                ) : isError ? (
                    <p className="text-sm text-red-500">
                        No se pudieron cargar los horarios.
                    </p>
                ) : schedules.length === 0 ? (
                    <p className="text-sm text-slate-400">
                        No tiene horarios configurados.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {days.map((day) => {

                            const daySchedules = schedules.filter(
                                (schedule) =>
                                    schedule.dayOfWeek === day.value
                            )

                            if (daySchedules.length === 0) {
                                return null
                            }

                            const timeRanges = daySchedules
                                .map(
                                    (schedule) =>
                                        `${schedule.startTime}–${schedule.endTime}`
                                )
                                .join(" · ")

                            return (
                                <div
                                    key={day.value}
                                    className="flex items-center justify-between gap-4 text-sm"
                                >
                                    <span className="font-medium text-slate-700">
                                        {day.label}
                                    </span>

                                    <span className="text-right text-slate-500">
                                        {timeRanges}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-end">
                <Link href={`/patient/book-appointment?doctorId=${doctor.id}`}>
                    <Button>
                        Solicitar turno
                    </Button>
                </Link>
            </div>

        </article>
    )
}