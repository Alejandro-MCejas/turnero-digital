import Badge from "../../ui/data-display/Badge"
import IconButton from "../../ui/buttons/IconButton"
import { Eye } from "lucide-react"
import Avatar from "../../ui/data-display/Avatar"
import { Appointment } from "@/types/models/appointment"
import Link from "next/link"
import { appointmentStatusVariant } from "@/constants/status/appointmentStatusVariant"


export default function AppointmentItem({ id, patient, doctor, specialty, date, time, status }: Appointment) {
    return (
        <tr className="border-t hover:bg-slate-50 transition-colors">
            <td className="px-3 lg:px-6 py-5">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar name={patient} />
                    <span className="font-medium leading-5">{patient}</span>
                </div>
            </td>
            <td className="px-3 lg:px-6 py-5">
                {doctor}
            </td>
            <td className="px-3 lg:px-6 py-5">
                {specialty}
            </td>
            <td className="px-3 lg:px-6 py-5">
                <div className="space-y-1">
                    <div>{date}</div>

                    <div className="text-sm text-slate-500">
                        {time}
                    </div>
                </div>
            </td>
            <td className="px-3 lg:px-6 py-5 text-center">
                <Badge variant={appointmentStatusVariant[status]}>{status}</Badge>
            </td>
            <td className="px-3 lg:px-6 py-5">
                <div className="flex justify-center gap-2">
                    <Link href={`/admin/appointments/${id}`}>
                        <IconButton>
                            <Eye className="h-4 w-4" />
                        </IconButton>
                    </Link>
                </div>
            </td>
        </tr>
    )
}