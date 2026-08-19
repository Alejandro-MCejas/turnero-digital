import Button from "../../ui/buttons/Button";
import DashboardSection from "../sections/DashboardSection";
import TodayAgendaItem from "./TodayAgendaItem";
import Link from "next/link";
import EmptyState from "../../shared/empty-state/EmptyState";
import { CalendarDays } from "lucide-react";
import { Appointment } from "@/types/models/appointment";

interface TodayAgendaItem {
    appointments: Appointment[]
}


export default function TodayAgenda({ appointments }: TodayAgendaItem) {
    return (
        <DashboardSection title="Agenda de hoy" action={
            <Link href="/admin/appointments">
                <Button variant="ghost">Ver todos</Button>
            </Link>
        }>
            {appointments.length > 0 ? (
                appointments.map(appointment => (
                    <TodayAgendaItem
                        key={appointment.id}
                        patient={appointment.user.name}
                        specialty={appointment.doctor.specialty}
                        time={appointment.time}
                        status={appointment.status}
                    />
                ))
            ) : (
                <EmptyState
                    size="sm"
                    icon={<CalendarDays className="h-10 w-10" />}
                    title="No hay turnos para hoy"
                    description="Los turnos del día aparecerán aquí."
                />
            )}
        </DashboardSection>
    )
}