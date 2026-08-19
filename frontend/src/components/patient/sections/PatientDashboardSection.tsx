"use client"

import PageHeader from "@/components/shared/headers/PageHeader";
import AppointmentCard from "../cards/AppointmentCard";
import QuickActionCard from "../cards/QuickActionCard";
import NextAppointmentCard from "../cards/NextAppointmentCard";
import { CalendarDays, CalendarPlus } from "lucide-react";
import { useMyAppointments } from "@/features/appointments/hooks/useMyAppointments";
import Loader from "@/components/ui/feedback/Loader";
import { appointmentStatus } from "@/types/enums/appointmentStatus";
import { buildDateTime } from "@/lib/utils/buidDateTime";
import EmptyState from "@/components/shared/empty-state/EmptyState";
import Link from "next/link";
import Button from "@/components/ui/buttons/Button";


export default function PatientDashboardSection() {

    const { data: appointments = [], isLoading, isError } = useMyAppointments()

    if (isLoading) {
        return (
            <Loader title="Cargando tus turnos" description="Obteniendo información..." />
        )
    }

    if (isError) {
        return (
            <div className="space-y-8">
                <PageHeader
                    title="Inicio"
                    subtitle="Consultá tu próximo turno y accedé rápidamente a las funciones principales."
                />

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <p className="text-sm text-red-600">No se pudieron cargar tus turnos.</p>
                </div>
            </div>
        )
    }

    const upcomingAppointments = appointments
        .filter(
            appointment =>
                appointment.status === appointmentStatus.PENDING ||
                appointment.status === appointmentStatus.CONFIRMED
        )
        .filter(appointment => {
            return buildDateTime(appointment.date, appointment.time) > new Date()
        })
        .sort((a, b) => {
            return (
                buildDateTime(a.date, a.time).getTime() -
                buildDateTime(b.date, b.time).getTime()
            )
        })

    const nextAppointment = upcomingAppointments[0];

    return (
        <div className="space-y-8">

            <PageHeader
                title="Inicio"
                subtitle="Consultá tu próximo turno y accedé rápidamente a las funciones principales."
            />

            {nextAppointment && (
                <NextAppointmentCard
                    appointment={nextAppointment}
                />
            )}

            <div className="grid gap-6 md:grid-cols-2">

                <QuickActionCard
                    title="Solicitar turno"
                    description="Reservá un nuevo turno con un profesional."
                    href="/patient/book-appointment"
                    icon={CalendarPlus}
                />

                <QuickActionCard
                    title="Mis turnos"
                    description="Consultá tus próximos turnos e historial."
                    href="/patient/appointments"
                    icon={CalendarDays}
                />

            </div>

            <section className="space-y-4">

                <h2 className="text-xl font-bold text-slate-900">
                    Próximos turnos
                </h2>

                {upcomingAppointments.length === 0 ? (
                    <EmptyState
                        title="No tenés próximos turnos"
                        description="Cuando reserves un turno, aparecerá acá."
                        action={
                            <Link href="/patient/book-appointment">
                                <Button>Solicitar turno</Button>
                            </Link>
                        }
                        size="sm"
                        icon={<CalendarDays className="h-10 w-10" />}
                    />
                ) : (
                    upcomingAppointments.map(appointment => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                        />
                    ))
                )}

            </section>

        </div>
    )
}