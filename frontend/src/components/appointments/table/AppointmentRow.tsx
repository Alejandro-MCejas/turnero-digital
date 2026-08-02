import { Appointment } from "@/types/models/appointment"
import Avatar from "../../ui/data-display/Avatar"
import Badge from "../../ui/data-display/Badge"
import Button from "../../ui/buttons/Button"
import { Pencil, Trash } from "lucide-react"
import { appointmentStatusVariant } from "@/constants/status/appointmentStatusVariant"


interface AppointmentRowProps {
    appointment: Appointment
    onEdit: (appointment: Appointment) => void
    onDelete: (appointment: Appointment) => void
}


export default function AppointmentRow({ appointment, onEdit, onDelete }: AppointmentRowProps) {
    return (
        <tr className="border-t hover:bg-slate-100 transition-colors">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <Avatar name={appointment.patient} size="sm" />
                    <span className="font-medium">{appointment.patient}</span>
                </div>
            </td>
            <td className="px-6 py-5">{appointment.doctor}</td>
            <td className="px-6 py-5">{appointment.specialty}</td>
            <td className="px-6 py-5">
                <div>
                    <p>{appointment.date}</p>
                    <p className="text-sm text-slate-500">{appointment.time}</p>
                </div>
            </td>
            <td className="px-6 py-5 text-center">
                <Badge variant={appointmentStatusVariant[appointment.status]}>
                    {appointment.status}
                </Badge>
            </td>
            <td className="px-6 py-5">
                <div className="flex justify-center gap-2">
                    <Button variant="secondary" onClick={() => onEdit(appointment)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(appointment)}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </td>
        </tr>
    )
}