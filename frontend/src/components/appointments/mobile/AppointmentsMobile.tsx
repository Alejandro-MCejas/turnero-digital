import { Appointment } from "@/types/models/appointment";
import AppointmentCard from "../cards/AppointmentCard";
import Button from "../../ui/buttons/Button";
import { Pencil, Trash } from "lucide-react";


interface AppointmentsMobileProps {
    appointments: Appointment[];
    onEdit: (appointment: Appointment) => void;
    onDelete: (appointment: Appointment) => void;
}

export default function AppointmentsMobile({ appointments, onEdit, onDelete }: AppointmentsMobileProps) {
    return (
        <div className="space-y-4">
            {appointments.map((appointment) => (
                <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                >
                    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
                        <Button
                            variant="secondary"
                            className="justify-center"
                            onClick={() => onEdit(appointment)}
                        >
                            <Pencil className="h-4 w-4" />
                            Editar
                        </Button>

                        <Button
                            variant="danger"
                            className="justify-center"
                            onClick={() => onDelete(appointment)}
                        >
                            <Trash className="h-4 w-4" />
                            Cancelar
                        </Button>
                    </div>
                </AppointmentCard>
            ))}
        </div>
    )
}