import Badge from "@/components/ui/data-display/Badge";
import Button from "@/components/ui/buttons/Button";
import { getStatusVariant } from "@/lib/utils/getStatusVariant";
import { CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import { Appointment } from "@/types/models/appointment";
import { formatDate } from "@/lib/utils/formatDate";
import { appointmentStatusLabel } from "@/constants/status/appointmentStatusLabel";

interface AppointmentCardProps {
    appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="font-semibold">
                        {appointment.doctor.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                        {appointment.doctor.specialty}
                    </p>

                </div>

                <Badge
                    variant={getStatusVariant(appointment.status)}
                    className="px-3 py-1 text-sm"
                >
                    {appointmentStatusLabel[appointment.status]}
                </Badge>

            </div>

            <div className="mt-5 flex gap-6 text-sm text-slate-600">

                <div className="flex items-center gap-2">

                    <CalendarDays className="h-4 w-4" />

                    <span>{formatDate(appointment.date)}</span>

                </div>

                <div className="flex items-center gap-2">

                    <Clock3 className="h-4 w-4" />

                    <span>{appointment.time}</span>

                </div>

            </div>

            <div className="mt-6 flex justify-end">

                <Link href={`/patient/appointments/${appointment.id}`}>

                    <Button>
                        Ver detalles
                    </Button>

                </Link>

            </div>

        </article>
    )
}