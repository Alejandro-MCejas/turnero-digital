"use client"

import PageHeader from "@/components/shared/headers/PageHeader";
import Badge from "@/components/ui/data-display/Badge";
import Button from "@/components/ui/buttons/Button";
import { appointments } from "@/mocks/patientAppointments"
import { getStatusVariant } from "@/lib/utils/getStatusVariant";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Stethoscope } from "lucide-react";
import Link from "next/link";
import AppointmentInfoItem from "../ui/AppointmentInfoItem";
import { useState } from "react";
import ConfirmCancelAppointmentModal from "../modals/ConfirmCancelAppointmentModal";


interface PatientAppointmentDetailSectionProps {
    appointmentId: string
}

export default function PatientAppointmentDetailSection({ appointmentId }: PatientAppointmentDetailSectionProps) {

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const appointment = appointments.find(
        (appointment) => appointment.id === appointmentId
    );

    if (!appointment) {
        return (
            <div className="space-y-6">

                <PageHeader
                    title="Turno no encontrado"
                    subtitle="El turno solicitado no existe."
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

                        <h2 className="text-xl font-semibold">

                            {appointment.doctor}

                        </h2>

                        <p className="text-slate-500">

                            {appointment.specialty}

                        </p>

                    </div>

                    <Badge
                        variant={getStatusVariant(appointment.status)}
                        className="px-3 py-1 text-sm"
                    >
                        {appointment.status}
                    </Badge>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <AppointmentInfoItem
                        icon={CalendarDays}
                        label="Fecha"
                        value={appointment.date}
                    />

                    <AppointmentInfoItem
                        icon={Clock3}
                        label="Hora"
                        value={appointment.time}
                    />

                    <AppointmentInfoItem
                        icon={Stethoscope}
                        label="Especialidad"
                        value={appointment.specialty}
                    />

                    <div className="md:col-span-2">

                        <AppointmentInfoItem
                            icon={MapPin}
                            label="Dirección"
                            value={appointment.address}
                        />

                    </div>

                </div>

                {appointment.status !== "Cancelado" && (
                    <div className="mt-10 flex justify-end">
                        <Button
                            variant="danger"
                            onClick={() => {
                                setIsCancelModalOpen(true)
                            }}
                        >
                            Cancelar turno
                        </Button>
                    </div>
                )}
            </section>

            <ConfirmCancelAppointmentModal
                open={isCancelModalOpen}
                onCancel={() => setIsCancelModalOpen(false)}
                onConfirm={() => setIsCancelModalOpen(false)}
            />


        </div>
    );
}