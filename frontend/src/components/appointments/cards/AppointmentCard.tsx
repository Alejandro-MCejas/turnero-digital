import { Appointment } from "@/types/models/appointment";
import Avatar from "../../ui/data-display/Avatar";
import Badge from "../../ui/data-display/Badge";
import { appointmentStatusVariant } from "@/constants/status/appointmentStatusVariant";
import { CalendarDays, Clock3, Stethoscope, UserRound } from "lucide-react";
import { appointmentStatusLabel } from "@/constants/status/appointmentStatusLabel";
import { formatDate } from "@/lib/utils/formatDate";

interface AppointmentCardProps {
    appointment: Appointment
    children?: React.ReactNode
}


export default function AppointmentCard({ appointment, children }: AppointmentCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

                <Avatar name={appointment.user.name} />

                <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                        {appointment.user.name}
                    </h3>

                    <Badge
                        variant={appointmentStatusVariant[appointment.status]}
                        className="mt-2"
                    >
                        {appointmentStatusLabel[appointment.status]}
                    </Badge>
                </div>

            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">

                <div className="flex items-center gap-1.5">
                    <UserRound className="h-4 w-4" />
                    <span>{appointment.doctor.name}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Stethoscope className="h-4 w-4" />
                    <span>{appointment.doctor.specialty}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    <span>{formatDate(appointment.date)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" />
                    <span>{appointment.time}</span>
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