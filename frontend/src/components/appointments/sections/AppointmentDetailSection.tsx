"use client"

import Link from "next/link";
import AppointmentInfoItem from "../../patient/ui/AppointmentInfoItem";
import Badge from "../../ui/data-display/Badge";
import Button from "../../ui/buttons/Button";
import PageHeader from "../../shared/headers/PageHeader";
import { ArrowLeft, CalendarDays, Clock3, Stethoscope, UserRound } from "lucide-react";
import { useState } from "react";
import Modal from "../../ui/overlay/Modal";
import AppointmentForm from "../forms/AppointmentForm";
import ConfirmDeleteModal from "../../shared/modals/ConfirmDeleteModal";
import { useAppointment } from "@/features/appointments/hooks/useAppointment";
import { useDeleteAppointment } from "@/features/appointments/hooks/useDeleteAppointment";
import { appointmentStatus } from "@/types/enums/appointmentStatus";
import { appointmentStatusVariant } from "@/constants/status/appointmentStatusVariant";
import { appointmentStatusLabel } from "@/constants/status/appointmentStatusLabel";
import Loader from "@/components/ui/feedback/Loader";


interface AppointmentDetailSectionProps {
    appointmentId: string;
}

export default function AppointmentDetailSection({
    appointmentId,
}: AppointmentDetailSectionProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { data: appointment, isLoading, isError } = useAppointment(appointmentId)

    const { mutate: deleteAppointment, isPending: isDeleting } = useDeleteAppointment()

    const handleConfirmDelete = () => {
        deleteAppointment({ id: appointmentId }, {
            onSuccess: () => {
                setIsDeleteModalOpen(false)
            }
        })
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <PageHeader
                    title="Detalle del turno"
                    subtitle="Cargando información del turno..."
                />

                <Loader title="Cargando turno..." description="Obteniendo información del turno..." />
            </div>
        )
    }

    if (isError || !appointment) {
        return (
            <div className="space-y-6">
                <PageHeader
                    title="Turno no encontrado"
                    subtitle="El turno solicitado no existe o no pudo ser cargado."
                />

                <Link href="/admin/appointments">
                    <Button>
                        <ArrowLeft className="h-4 w-4" />
                        Volver a turnos
                    </Button>
                </Link>
            </div>
        )
    }

    const isCancelled = appointment.status === appointmentStatus.CANCELLED

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
                            {appointment.user.name}
                        </h2>

                        <p className="text-slate-500">
                            {appointment.doctor.name}
                        </p>
                    </div>

                    <Badge
                        variant={appointmentStatusVariant[appointment.status]}
                    >
                        {appointmentStatusLabel[appointment.status]}
                    </Badge>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <AppointmentInfoItem
                        icon={UserRound}
                        label="Paciente"
                        value={appointment.user.name}
                    />

                    <AppointmentInfoItem
                        icon={Stethoscope}
                        label="Médico"
                        value={appointment.doctor.name}
                    />

                    <AppointmentInfoItem
                        icon={Stethoscope}
                        label="Especialidad"
                        value={appointment.doctor.specialty}
                    />

                    <AppointmentInfoItem
                        icon={CalendarDays}
                        label="Fecha"
                        value={appointment.date.split("T")[0]}
                    />

                    <AppointmentInfoItem
                        icon={Clock3}
                        label="Hora"
                        value={appointment.time}
                    />

                </div>

                {!isCancelled && (
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
                )}

            </section>

            {!isCancelled && (
                <Modal
                    open={isModalOpen}
                    title="Editar turno"
                    subtitle="Modifica la información del turno."
                    onClose={() => setIsModalOpen(false)}
                    size="lg"
                >
                    <AppointmentForm appointment={appointment} onCancel={() => setIsModalOpen(false)} />
                </Modal>
            )}

            {!isCancelled && (
                <ConfirmDeleteModal
                    open={isDeleteModalOpen}
                    title="Confirmar cancelación"
                    heading="¿Cancelar turno"
                    confirmText={
                        isDeleting
                            ? "Cancelando..."
                            : "Cancelar turno"
                    }
                    message={`El turno de ${appointment.user.name} será cancelado permanentemente.\nEsta acción no se puede deshacer.`}
                    entity="turno"
                    onCancel={() => {
                        if (isDeleting) return;

                        setIsDeleteModalOpen(false);
                    }}
                    onConfirm={handleConfirmDelete}
                />
            )}

        </div>
    );
}