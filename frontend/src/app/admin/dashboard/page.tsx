"use client"

import AppointmentsChart from "@/components/dashboard/charts/AppointmentsChart";
import DashboardStats from "@/components/dashboard/ui/DashboardStats";
import StatusCard from "@/components/dashboard/cards/StatusCard";
import TodayAgenda from "@/components/dashboard/ui/TodayAgenda";
import UpcomingAppointments from "@/components/dashboard/cards/UpcomingAppointments";
import PageHeader from "@/components/shared/headers/PageHeader";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import Loader from "@/components/ui/feedback/Loader";


export default function DashboardPage() {

    const { data: dashboard, isLoading, isError } = useDashboardStats()

    if (isLoading) {
        return (
            <Loader title="Cargando dashboard" description="Obteniendo información del sistema..." />
        )
    }

    if (isError || !dashboard) {
        return (
            <div>
                <PageHeader
                    title="Dashboard"
                    subtitle="Resumen general del sistema"
                />

                <div className="py-12 text-center text-slate-500">
                    No se pudo cargar la información del dashboard.
                </div>
            </div>
        )
    }

    return (
        <div>
            <PageHeader title="Dashboard" subtitle="Resumen general del sistema" />

            <DashboardStats totals={dashboard.totals} byStatus={dashboard.byStatus} today={dashboard.today} />

            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5">
                <StatusCard byStatus={dashboard.byStatus} total={dashboard.totals.appointments} />

                <AppointmentsChart byDay={dashboard.byDay} />

                <TodayAgenda appointments={dashboard.todayPreview} />
            </div>

            <div className="mt-6">
                <UpcomingAppointments appointments={dashboard.upcoming} />
            </div>
        </div>
    )
}