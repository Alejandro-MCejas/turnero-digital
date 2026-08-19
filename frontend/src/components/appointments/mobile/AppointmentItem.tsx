import Badge from "../../ui/data-display/Badge"
import IconButton from "../../ui/buttons/IconButton"
import { Eye } from "lucide-react"
import Avatar from "../../ui/data-display/Avatar"
import { Appointment } from "@/types/models/appointment"
import Link from "next/link"
import { appointmentStatusVariant } from "@/constants/status/appointmentStatusVariant"
import { appointmentStatusLabel } from "@/constants/status/appointmentStatusLabel"
import { formatDate } from "@/lib/utils/formatDate"


interface AppointmentItemProps {
    appointment: Appointment
}

export default function AppointmentItem({ appointment }: AppointmentItemProps) {
    return (
        <tr className="border-t hover:bg-slate-50 transition-colors">
            <td className="px-3 lg:px-6 py-5">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar name={appointment.user.name} />
                    <span className="font-medium leading-5">{appointment.user.name}</span>
                </div>
            </td>
            <td className="px-3 lg:px-6 py-5">
                {appointment.doctor.name}
            </td>
            <td className="px-3 lg:px-6 py-5">
                {appointment.doctor.specialty}
            </td>
            <td className="px-3 lg:px-6 py-5">
                <div className="space-y-1">
                    <div>{formatDate(appointment.date)}</div>

                    <div className="text-sm text-slate-500">
                        {appointment.time}
                    </div>
                </div>
            </td>
            <td className="px-3 lg:px-6 py-5 text-center">
                <Badge variant={appointmentStatusVariant[appointment.status]}>
                    {appointmentStatusLabel[appointment.status]}
                </Badge>
            </td>
            <td className="px-3 lg:px-6 py-5">
                <div className="flex justify-center gap-2">
                    <Link href={`/admin/appointments/${appointment.id}`}>
                        <IconButton>
                            <Eye className="h-4 w-4" />
                        </IconButton>
                    </Link>
                </div>
            </td>
        </tr>
    )
}