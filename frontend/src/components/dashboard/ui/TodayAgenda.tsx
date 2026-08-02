import { agenda } from "@/mocks/dashboard";
import Button from "../../ui/buttons/Button";
import DashboardSection from "../sections/DashboardSection";
import TodayAgendaItem from "./TodayAgendaItem";
import Link from "next/link";
import EmptyState from "../../shared/empty-state/EmptyState";
import { CalendarDays } from "lucide-react";


export default function TodayAgenda() {
    return (
        <DashboardSection title="Agenda de hoy" action={
            <Link href="/admin/appointments">
                <Button variant="ghost">Ver todos</Button>
            </Link>
        }>
            {agenda.length > 0 ? (
                agenda.map(item => (
                    <TodayAgendaItem
                        key={item.id}
                        patient={item.patient}
                        specialty={item.specialty}
                        time={item.time}
                        status={item.status}
                    />
                ))
            ) : (
                <EmptyState
                    size="sm"
                    icon={<CalendarDays className="h-10 w-10" />}
                    title="No hay turnos para hoy"
                    description="Los turnos del día aparecerán aquí."
                />
            )
            }
        </DashboardSection>
    )
}