"use client"

import PageHeader from "@/components/shared/headers/PageHeader";
import Badge from "@/components/ui/data-display/Badge";
import Button from "@/components/ui/buttons/Button";
import { getStatusVariant } from "@/lib/utils/getStatusVariant";
import { ArrowLeft, CalendarDays, Clock3, Stethoscope } from "lucide-react";
import Link from "next/link";
import AppointmentInfoItem from "../ui/AppointmentInfoItem";
import { useState } from "react";
import ConfirmCancelAppointmentModal from "../modals/ConfirmCancelAppointmentModal";
import { useMyAppointments } from "@/features/appointments/hooks/useMyAppointments";
import Loader from "@/components/ui/feedback/Loader";
import { appointmentStatusLabel } from "@/constants/status/appointmentStatusLabel";
import { formatDate } from "@/lib/utils/formatDate";
import { appointmentStatus } from "@/types/enums/appointmentStatus";
import { useUpdateAppointment } from "@/features/appointments/hooks/useUpdateAppointment";


interface PatientAppointmentDetailSectionProps {
    appointmentId: string
}

export default function PatientAppointmentDetailSection({ appointmentId }: PatientAppointmentDetailSectionProps) {

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const { data: appointments = [], isLoading, isError } = useMyAppointments();

    const updateAppointmentMutation = useUpdateAppointment();

    if (isLoading) {
        return (
            <Loader title="Cargando turno" description="Obteniendo información..." />
        )
    }

    if (isError) {
        return (
            <div className="space-y-6">

                <PageHeader
                    title="Error al cargar el turno"
                    subtitle="No pudimos obtener la información del turno."
                />

                <Link href="/patient/appointments">
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a mis turnos
                    </Button>
                </Link>

            </div>
        )
    }

    const appointment = appointments.find(appointment => appointment.id === appointmentId)

    if (!appointment) {
        return (
            <div className="space-y-6">

                <PageHeader
                    title="Turno no encontrado"
                    subtitle="El turno solicitado no existe o no está asociado a tu cuenta."
                />

                <Link href="/patient/appointments">
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Button>
                </Link>

            </div>
        );
    }

    return (
        <div className="space-y-8">

            <Link
                href="/patient/appointments"
                className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
                <ArrowLeft className="h-4 w-4" />

                Volver a mis turnos
            </Link>

            <PageHeader
                title="Detalle del turno"
                subtitle="Consultá toda la información de tu turno."
            />

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-semibold">{appointment.doctor.name}</h2>

                        <p className="text-slate-500">{appointment.doctor.specialty}</p>
                    </div>

                    <Badge
                        variant={getStatusVariant(appointment.status)}
                        className="px-3 py-1 text-sm"
                    >
                        {appointmentStatusLabel[appointment.status]}
                    </Badge>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <AppointmentInfoItem
                        icon={CalendarDays}
                        label="Fecha"
                        value={formatDate(appointment.date)}
                    />

                    <AppointmentInfoItem
                        icon={Clock3}
                        label="Hora"
                        value={appointment.time}
                    />

                    <AppointmentInfoItem
                        icon={Stethoscope}
                        label="Especialidad"
                        value={appointment.doctor.specialty}
                    />

                </div>

                {(
                    appointment.status === appointmentStatus.PENDING ||
                    appointment.status === appointmentStatus.CONFIRMED
                ) && (
                        <div className="mt-10 flex justify-end">

                            <Button
                                variant="danger"
                                onClick={() => setIsCancelModalOpen(true)}
                            >
                                Cancelar turno
                            </Button>

                        </div>
                    )}
            </section>

            <ConfirmCancelAppointmentModal
                open={isCancelModalOpen}
                onCancel={() => setIsCancelModalOpen(false)}
                onConfirm={() => {
                    updateAppointmentMutation.mutate(
                        {
                            id: appointment.id,
                            dto: {
                                status: appointmentStatus.CANCELLED
                            }
                        },
                        {
                            onSuccess: () => {
                                setIsCancelModalOpen(false)
                            }
                        }
                    )
                }}
                isLoading={updateAppointmentMutation.isPending}
            />


        </div>
    );
}