import StatCard from "../cards/StatCard";
import { CalendarDays, Clock3, Stethoscope, Users } from "lucide-react";
import { DashboardStats as DashbpardStatsModel } from "@/types/models/dashboard";

interface DashboardStatsProps {
    totals: DashbpardStatsModel["totals"];
    byStatus: DashbpardStatsModel["byStatus"];
    today: DashbpardStatsModel["today"];
}

export default function DashboardStats({ totals, byStatus, today }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Usuarios" value={totals.users} icon={Users} color="blue" />
            <StatCard title="Médicos" value={totals.doctors} icon={Stethoscope} color="green" />
            <StatCard title="Turnos hoy" value={today.length} icon={CalendarDays} color="violet" />
            <StatCard title="Pendientes" value={byStatus.pending} icon={Clock3} color="yellow" />
        </div>
    )
}