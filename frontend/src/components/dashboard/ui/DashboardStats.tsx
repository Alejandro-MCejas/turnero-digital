import StatCard from "../cards/StatCard";
import { CalendarDays, Clock3, Stethoscope, Users } from "lucide-react";

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Usuarios" value={10} icon={Users} color="blue" />
            <StatCard title="Médicos" value={10} icon={Stethoscope} color="green" />
            <StatCard title="Turnos hoy" value={10} icon={CalendarDays} color="violet" />
            <StatCard title="Pendientes" value={10} icon={Clock3} color="yellow" />
        </div>
    )
}