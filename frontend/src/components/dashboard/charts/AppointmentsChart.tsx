import AppointmentsBarChart from "./AppointmentsBarChart";
import DashboardSection from "../sections/DashboardSection";
import { DashboardStats as DashboardStatsModel } from "@/types/models/dashboard";

interface AppointmentsChartProps {
    byDay: DashboardStatsModel["byDay"]
}


export default function AppointmentsChart({ byDay }: AppointmentsChartProps) {
    return (
        <DashboardSection title="Turnos por día (Esta semana)">
            <AppointmentsBarChart byDay={byDay} />
        </DashboardSection>
    )
}