import AppointmentsChart from "@/components/dashboard/charts/AppointmentsChart";
import DashboardStats from "@/components/dashboard/ui/DashboardStats";
import StatusCard from "@/components/dashboard/cards/StatusCard";
import TodayAgenda from "@/components/dashboard/ui/TodayAgenda";
import UpcomingAppointments from "@/components/dashboard/cards/UpcomingAppointments";
import PageHeader from "@/components/shared/headers/PageHeader";




export default function DashboardPage() {
    return (
        <div>
            <PageHeader title="Dashboard" subtitle="Resumen general del sistema" />
            <DashboardStats />

            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5">
                <StatusCard />
                <AppointmentsChart />
                <TodayAgenda />
            </div>

            <div className="mt-6">
                <UpcomingAppointments />
            </div>
        </div>
    )
}