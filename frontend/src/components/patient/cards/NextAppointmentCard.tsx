import Badge from "@/components/ui/data-display/Badge"
import Button from "@/components/ui/buttons/Button"
import { getStatusVariant } from "@/lib/utils/getStatusVariant"
import { PatientAppointment } from "@/types/models/patient"
import { CalendarDays, Clock3, Stethoscope } from "lucide-react"
import Link from "next/link"

interface NextAppointmentCardProps {
    appointment: PatientAppointment
}

export default function NextAppointmentCard({ appointment }: NextAppointmentCardProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h2 className="mb-6 text-xl font-bold text-slate-900">Próximo turno</h2>

            <div className="space-y-4">

                <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-violet-600" />

                    <div>
                        <p className="font-semibold">{appointment.doctor}</p>

                        <p className="text-sm text-slate-500">{appointment.specialty}</p>
                    </div>
                </div>

                <div className="flex gap-8">

                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-slate-500" />

                        <span>{appointment.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock3 className="h-5 w-5 text-slate-500" />

                        <span>{appointment.time}</span>
                    </div>

                </div>

                <div className="mt-4 flex items-center justify-between">

                    <Badge
                        variant={getStatusVariant(appointment.status)}
                        className="px-3 py-1 text-sm"
                    >
                        {appointment.status}
                    </Badge>

                    <Link href={`/patient/appointments/${appointment.id}`}>
                        <Button>
                            Ver detalles
                        </Button>
                    </Link>

                </div>

            </div>

        </section>
    )
}