import { Appointment } from "@/types/models/appointment"
import Avatar from "../../ui/data-display/Avatar"
import Badge from "../../ui/data-display/Badge"
import Button from "../../ui/buttons/Button"
import { Eye, Pencil, XCircle } from "lucide-react"
import { appointmentStatusVariant } from "@/constants/status/appointmentStatusVariant"
import { appointmentStatusLabel } from "@/constants/status/appointmentStatusLabel"
import { formatDate } from "@/lib/utils/formatDate"
import { appointmentStatus } from "@/types/enums/appointmentStatus"
import Link from "next/link"



interface AppointmentRowProps {
    appointment: Appointment
    onEdit: (appointment: Appointment) => void
    onDelete: (appointment: Appointment) => void
}


export default function AppointmentRow({ appointment, onEdit, onDelete }: AppointmentRowProps) {

    const isCancelled = appointment.status === appointmentStatus.CANCELLED

    return (
        <tr className="border-t hover:bg-slate-100 transition-colors">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <Avatar name={appointment.user.name} size="sm" />
                    <span className="font-medium">{appointment.user.name}</span>
                </div>
            </td>
            <td className="px-6 py-5">{appointment.doctor.name}</td>
            <td className="px-6 py-5">{appointment.doctor.specialty}</td>
            <td className="px-6 py-5">
                <div>
                    <p>{formatDate(appointment.date)}</p>
                    <p className="text-sm text-slate-500">{appointment.time}</p>
                </div>
            </td>
            <td className="px-6 py-5 text-center">
                <Badge variant={appointmentStatusVariant[appointment.status]}>
                    {appointmentStatusLabel[appointment.status]}
                </Badge>
            </td>
            <td className="px-6 py-5">
                <div className="flex justify-center gap-2">

                    <Link href={`/admin/appointments/${appointment.id}`}>
                        <Button variant="secondary">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>

                    {!isCancelled && (
                        <Button variant="secondary" onClick={() => onEdit(appointment)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                    )}


                    {!isCancelled && (
                        <Button variant="danger" onClick={() => onDelete(appointment)}>
                            <XCircle className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    )
}