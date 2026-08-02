import { Appointment } from "@/types/models/appointment";
import Avatar from "../../ui/data-display/Avatar";
import Badge from "../../ui/data-display/Badge";
import { appointmentStatusVariant } from "@/constants/status/appointmentStatusVariant";
import { CalendarDays, Clock3, Stethoscope, UserRound } from "lucide-react";

interface AppointmentCardProps extends Appointment {
    children?: React.ReactNode
}


export default function AppointmentCard({
    patient,
    doctor,
    specialty,
    date,
    time,
    status,
    children
}: AppointmentCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

                <Avatar name={patient} />

                <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                        {patient}
                    </h3>

                    <Badge
                        variant={appointmentStatusVariant[status]}
                        className="mt-2"
                    >
                        {status}
                    </Badge>
                </div>

            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">

                <div className="flex items-center gap-1.5">
                    <UserRound className="h-4 w-4" />
                    <span>{doctor}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Stethoscope className="h-4 w-4" />
                    <span>{specialty}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    <span>{date}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" />
                    <span>{time}</span>
                </div>

            </div>

            {children && (
                <div className="mt-6">
                    {children}
                </div>
            )}

        </article>
    );
}