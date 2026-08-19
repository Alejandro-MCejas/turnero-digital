"use client"

import AppointmentFilters from "@/components/appointments/ui/AppointmentFilters";
import AppointmentForm from "@/components/appointments/forms/AppointmentForm";
import AppointmentRow from "@/components/appointments/table/AppointmentRow";
import AppointmentsMobile from "@/components/appointments/mobile/AppointmentsMobile";
import ConfirmDeleteModal from "@/components/shared/modals/ConfirmDeleteModal";
import EmptyState from "@/components/shared/empty-state/EmptyState";
import PageHeader from "@/components/shared/headers/PageHeader";
import Button from "@/components/ui/buttons/Button";
import Modal from "@/components/ui/overlay/Modal";
import Table from "@/components/ui/data-display/Table";
import { Appointment } from "@/types/models/appointment";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import TableToolbar from "@/components/shared/tables/TableToolbar";
import { useAppointments } from "@/features/appointments/hooks/useAppointments";
import { useDeleteAppointment } from "@/features/appointments/hooks/useDeleteAppointment";
import Loader from "@/components/ui/feedback/Loader";



export default function AppointmentsPage() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null)

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [doctorFilter, setDoctorFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")

    const { data: appointments = [], isLoading } = useAppointments()

    const { mutate: deleteAppointment, isPending: isDeleting } = useDeleteAppointment()


    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch =
            appointment.user.name.toLowerCase().includes(search.toLowerCase()) ||
            appointment.doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            appointment.doctor.specialty.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = !statusFilter || appointment.status === statusFilter

        const matchesDoctor = !doctorFilter || appointment.doctor.id === doctorFilter

        const matchesDate = !dateFilter || appointment.date.split("T")[0] === dateFilter

        return (
            matchesSearch &&
            matchesStatus &&
            matchesDoctor &&
            matchesDate
        )
    })

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("")
        setDoctorFilter("")
        setDateFilter("")
    }

    const handleNewAppointment = () => {
        setEditingAppointment(null);
        setIsModalOpen(true);
    };

    const handleEditAppointment = (appointment: Appointment) => {
        setEditingAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleDeleteAppointment = (appointment: Appointment) => {
        setAppointmentToDelete(appointment);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {

        if (!appointmentToDelete) return

        deleteAppointment({ id: appointmentToDelete.id }, {
            onSuccess: () => {
                setAppointmentToDelete(null)
                setIsDeleteModalOpen(false)
            }
        })
    }


    return (
        <div className="space-y-6">
            <PageHeader
                title="Turnos"
                subtitle="Gestiona los turnos del sistema"
            />
            <TableToolbar>
                <AppointmentFilters
                    search={search}
                    statusFilter={statusFilter}
                    doctorFilter={doctorFilter}
                    dateFilter={dateFilter}
                    onSearchChange={setSearch}
                    onStatusChange={setStatusFilter}
                    onDoctorChange={setDoctorFilter}
                    onDateChange={setDateFilter}
                    onClearFilters={clearFilters}
                />

                <Button className="px-8" onClick={handleNewAppointment}>
                    Nuevo turno
                </Button>

            </TableToolbar>

            {isLoading ? (

                <Loader title="Cargando turnos..." description="Obteniendo turnos del sistema..." />

            ) : appointments.length === 0 ? (

                <EmptyState
                    icon={<CalendarDays className="h-14 w-14" />}
                    title="Todavía no hay turnos"
                    description="Comenzá agregando el primer turno al sistema."
                    action={
                        <Button onClick={handleNewAppointment}>
                            Nuevo turno
                        </Button>
                    }
                />
            ) : filteredAppointments.length === 0 ? (
                <EmptyState
                    icon={<CalendarDays className="h-14 w-14" />}
                    title="No se encontraron turnos"
                    description="Probá modificando la búsqueda o limpiando los filtros."
                />
            ) : (
                <>
                    <div className="hidden lg:block">
                        <Table headers={["Paciente", "Médico", "Especialidad", "Fecha y hora", "Estado", "Acciones"]}
                            align={["left", "left", "left", "left", "center", "center"]}
                        >
                            {filteredAppointments.map(appointment => (
                                <AppointmentRow
                                    key={appointment.id}
                                    appointment={appointment}
                                    onEdit={handleEditAppointment}
                                    onDelete={handleDeleteAppointment}
                                />
                            ))}
                        </Table>
                    </div>

                    <div className="lg:hidden">
                        <AppointmentsMobile
                            appointments={filteredAppointments}
                            onEdit={handleEditAppointment}
                            onDelete={handleDeleteAppointment}
                        />
                    </div>
                </>
            )
            }

            <Modal
                open={isModalOpen}
                title={editingAppointment ? "Editar turno" : "Nuevo turno"}
                subtitle={
                    editingAppointment
                        ? "Modifica la información del turno."
                        : "Completa la información para registrar un nuevo turno."
                }
                onClose={() => setIsModalOpen(false)}
                size="lg"
            >
                <AppointmentForm appointment={editingAppointment} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            <ConfirmDeleteModal
                open={isDeleteModalOpen}
                title="Confirmar cancelación"
                heading="¿Cancelar turno"
                confirmText={
                    isDeleting
                        ? "Cancelando..."
                        : "Cancelar turno"
                }
                message={
                    appointmentToDelete
                        ? `El turno de ${appointmentToDelete.user.name} será cancelado permanentemente. \nEsta acción no se puede deshacer.`
                        : ""
                }
                entity="turno"
                onCancel={() => {
                    if (isDeleting) return

                    setAppointmentToDelete(null)
                    setIsDeleteModalOpen(false)
                }}
                onConfirm={handleConfirmDelete}

            />
        </div>
    )
}