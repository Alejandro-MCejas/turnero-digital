import AppointmentItem from "../../appointments/mobile/AppointmentItem"
import DashboardSection from "../sections/DashboardSection"
import Table from "../../ui/data-display/Table";
import Button from "../../ui/buttons/Button";
import Link from "next/link";
import EmptyState from "../../shared/empty-state/EmptyState";
import { CalendarDays } from "lucide-react";
import AppointmentCard from "../../appointments/cards/AppointmentCard";
import { Appointment } from "@/types/models/appointment";

interface UpcomingAppointmentsProps {
    appointments: Appointment[]
}

export default function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
    return (
        <DashboardSection title="Próximos turnos" action={
            <Link href="/admin/appointments">
                <Button variant="ghost">Ver todos los turnos</Button>
            </Link>
        }>
            {appointments.length > 0 ? (
                <>
                    <div className="hidden lg:block">
                        <Table headers={["Paciente", "Médico", "Especialidad", "Fecha y hora", "Estado", "Acciones"]}
                            align={["left", "left", "left", "left", "center", "center"]}
                        >
                            {appointments.map(appointment => (
                                <AppointmentItem
                                    key={appointment.id}
                                    appointment={appointment}
                                />
                            ))}
                        </Table>
                    </div>

                    <div className="space-y-4 lg:hidden">
                        {appointments.map(appointment => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                            >
                                <Link
                                    href={`/admin/appointments/${appointment.id}`}
                                    className="w-full"
                                >
                                    <Button className="w-full justify-center">
                                        Ver detalle
                                    </Button>
                                </Link>
                            </AppointmentCard>
                        ))}
                    </div>

                </>
            ) : (
                <EmptyState
                    size="sm"
                    icon={<CalendarDays className="h-10 w-10" />}
                    title="No hay próximos turnos"
                    description="Los próximos turnos aparecerán aquí."
                />
            )
            }
        </DashboardSection>
    )
}