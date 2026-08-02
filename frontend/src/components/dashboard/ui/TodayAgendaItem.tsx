import Badge from "../../ui/data-display/Badge"
import Avatar from "../../ui/data-display/Avatar"
import type { AppointmentStatus } from "@/types/enums/appointmentStatus"
import { appointmentStatusVariant } from "@/constants/status/appointmentStatusVariant"


interface TodayAgendaProps {
    patient: string
    specialty: string
    time: string
    status: AppointmentStatus
}

export default function TodayAgendaItem({ patient, specialty, time, status }: TodayAgendaProps) {
    return (
        <div className="border-b py-4 last:border-none">

            <div className="flex items-center">

                <div className="flex items-center gap-2 shrink-0">
                    <span className="w-10 text-sm font-medium text-slate-700">{time}</span>
                    <Avatar name={patient} />
                </div>

                <div className="ml-3 min-w-0 flex-1">

                    <p className="truncate font-medium text-slate-900">{patient}</p>

                    <div className="mt-1 flex items-center justify-between gap-3">

                        <p className="truncate text-sm text-slate-500">{specialty}</p>

                        <Badge variant={appointmentStatusVariant[status]} className="shrink-0">
                            {status}
                        </Badge>

                    </div>

                </div>

            </div>

        </div>
    )
}