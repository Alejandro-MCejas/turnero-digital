import AppointmentsBarChart from "./AppointmentsBarChart";
import DashboardSection from "../sections/DashboardSection";



export default function AppointmentsChart() {
    return (
        <DashboardSection title="Turnos por día (Este mes)">
            <AppointmentsBarChart />
        </DashboardSection>
    )
}