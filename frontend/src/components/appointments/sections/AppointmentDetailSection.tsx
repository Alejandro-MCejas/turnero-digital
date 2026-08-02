"use client"

import Link from "next/link";
import AppointmentInfoItem from "../../patient/ui/AppointmentInfoItem";
import Badge from "../../ui/data-display/Badge";
import Button from "../../ui/buttons/Button";
import PageHeader from "../../shared/headers/PageHeader";
import { appointments } from "@/mocks/adminAppointments";
import { ArrowLeft, CalendarDays, Clock3, Stethoscope, UserRound } from "lucide-react";
import { getStatusVariant } from "@/lib/utils/getStatusVariant";
import { useState } from "react";
import Modal from "../../ui/overlay/Modal";
import AppointmentForm from "../forms/AppointmentForm";
import ConfirmDeleteModal from "../../shared/modals/ConfirmDeleteModal";


interface AppointmentDetailSectionProps {
    appointmentId: string;
}

export default function AppointmentDetailSection({
    appointmentId,
}: AppointmentDetailSectionProps) {
    const appointment = appointments.find(
        appointment => appointment.id === appointmentId
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    if (!appointment) {
        return (
            <div className="space-y-6">
                <PageHeader
                    title="Turno no encontrado"
                    subtitle="El turno solicitado no existe."
                />

                <Link href="/admin/appointments">
                    <Button>
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <Link
                href="/admin/appointments"
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver a turnos
            </Link>

            <PageHeader
                title="Detalle del turno"
                subtitle="Consultá toda la información del turno."
            />

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-semibold">
                            {appointment.patient}
                        </h2>

                        <p className="text-slate-500">
                            {appointment.doctor}
                        </p>
                    </div>

                    <Badge
                        variant={getStatusVariant(appointment.status)}
                    >
                        {appointment.status}
                    </Badge>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <AppointmentInfoItem
                        icon={UserRound}
                        label="Paciente"
                        value={appointment.patient}
                    />

                    <AppointmentInfoItem
                        icon={Stethoscope}
                        label="Médico"
                        value={appointment.doctor}
                    />

                    <AppointmentInfoItem
                        icon={Stethoscope}
                        label="Especialidad"
                        value={appointment.specialty}
                    />

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

                </div>

                <div className="mt-10 flex justify-end gap-3">

                    <Button
                        variant="secondary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Editar turno
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        Cancelar turno
                    </Button>

                </div>

            </section>

            <Modal
                open={isModalOpen}
                title="Editar turno"
                subtitle="Modifica la información del turno."
                onClose={() => setIsModalOpen(false)}
                size="lg"
            >
                <AppointmentForm appointment={appointment} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            <ConfirmDeleteModal
                open={isDeleteModalOpen}
                title="Confirmar cancelación"
                heading="¿Cancelar turno"
                confirmText="Cancelar turno"
                message={`El turno de ${appointment.patient} será cancelado permanentemente.\nEsta acción no se puede deshacer.`}
                entity="turno"
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={() => setIsDeleteModalOpen(false)}
            />

        </div>
    );
}