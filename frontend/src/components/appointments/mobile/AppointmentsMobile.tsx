import { Appointment } from "@/types/models/appointment";
import AppointmentCard from "../cards/AppointmentCard";
import Button from "../../ui/buttons/Button";
import { Eye, Pencil, XCircle } from "lucide-react";
import { appointmentStatus } from "@/types/enums/appointmentStatus";
import Link from "next/link";


interface AppointmentsMobileProps {
    appointments: Appointment[];
    onEdit: (appointment: Appointment) => void;
    onDelete: (appointment: Appointment) => void;
}

export default function AppointmentsMobile({ appointments, onEdit, onDelete }: AppointmentsMobileProps) {
    return (
        <div className="space-y-4">
            {appointments.map((appointment) => {

                const isCancelled = appointment.status === appointmentStatus.CANCELLED

                return (
                    <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                    >
                        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">

                            <Link href={`/admin/appointments/${appointment.id}`} className="w-full">
                                <Button variant="secondary" className="w-full justify-center">
                                    <Eye className="h-4 w-4" />
                                    Ver detalle
                                </Button>
                            </Link>


                            {!isCancelled && (
                                <>
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
                                        <XCircle className="h-4 w-4" />
                                        Cancelar
                                    </Button>
                                </>
                            )}
                        </div>
                    </AppointmentCard>
                )
            })}
        </div>
    )
}