"use client"

import ScheduleFilters from "@/components/schedules/ui/ScheduleFilters";
import ScheduleForm from "@/components/schedules/forms/ScheduleForm";
import ScheduleGrid from "@/components/schedules/ui/ScheduleGrid";
import ScheduleMobile from "@/components/schedules/mobile/ScheduleMobile";
import ConfirmDeleteModal from "@/components/shared/modals/ConfirmDeleteModal";
import EmptyState from "@/components/shared/empty-state/EmptyState";
import PageHeader from "@/components/shared/headers/PageHeader";
import Button from "@/components/ui/buttons/Button";
import Modal from "@/components/ui/overlay/Modal";
import { Schedule } from "@/types/models/schedule";
import { Clock3 } from "lucide-react";
import { useState } from "react";
import { useDoctors } from "@/features/doctors/hooks/useDoctors";
import { useDoctorSchedules } from "@/features/schedules/hooks/useDoctorSchedules";
import { useDeleteDoctorSchedule } from "@/features/schedules/hooks/useDeleteDoctorSchedule";
import Loader from "@/components/ui/feedback/Loader";


export default function SchedulesPage() {

    const [selectedDoctor, setSelectedDoctor] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(null)

    const { data: doctors = [], isLoading: isLoadingDoctors, isError: isErrorDoctors } = useDoctors()

    const { data: doctorSchedules = [], isLoading: isLoadingSchedules, isError: isErrorSchedules } =
        useDoctorSchedules(selectedDoctor)

    const { mutate: deleteDoctorSchedule, isPending: isDeleting } = useDeleteDoctorSchedule()

    const handleEditSchedule = (schedule: Schedule) => {
        setEditingSchedule(schedule)
        setIsModalOpen(true)
    }

    const handleDeleteSchedule = (schedule: Schedule) => {
        setScheduleToDelete(schedule)
        setIsDeleteModalOpen(true)
    }

    const handleCloseModal = () => {
        setEditingSchedule(null)
        setIsModalOpen(false)
    }

    const handleCloseDeleteModal = () => {
        setScheduleToDelete(null)
        setIsDeleteModalOpen(false)
    }

    if (isLoadingDoctors) {
        return (
            <Loader title="Cargando médicos" description="Obteniendo médicos disponibles..." />
        )
    }

    if (isErrorDoctors) {
        return (
            <EmptyState
                icon={<Clock3 className="h-14 w-14" />}
                title="Error al cargar médicos"
                description="No fue posible obtener los médicos del sistema."
            />
        )
    }

    return (
        <div className="space-y-6">
            <PageHeader title="Horarios" subtitle="Gestiona la disponibilidad de los médicos" />

            <ScheduleFilters
                doctors={doctors}
                selectedDoctor={selectedDoctor}
                onDoctorChange={setSelectedDoctor}
                onNewSchedule={() => {
                    setEditingSchedule(null)
                    setIsModalOpen(true)
                }}
            />

            {!selectedDoctor ? (
                <EmptyState
                    icon={<Clock3 className="h-14 w-14" />}
                    title="Seleccioná un médico"
                    description="Seleccioná un médico para consultar y gestionar sus horarios."
                />
            ) : isLoadingSchedules ? (
                <Loader title="Cargando horarios" description="Obteniendo los horarios del médico..."
                />
            ) : isErrorSchedules ? (
                <EmptyState
                    icon={<Clock3 className="h-14 w-14" />}
                    title="Error al cargar horarios"
                    description="No fue posible obtener los horarios del médico."
                />
            ) : doctorSchedules.length === 0 ? (
                <EmptyState
                    icon={<Clock3 className="h-14 w-14" />}
                    title="Este médico no tiene horarios"
                    description="Agregá un horario para este médico."
                    action={
                        <Button onClick={() => {
                            setEditingSchedule(null)
                            setIsModalOpen(true)
                        }}>
                            Nuevo horario
                        </Button>
                    }
                />
            ) : (
                <>
                    <div className="hidden lg:block">
                        <ScheduleGrid
                            schedules={doctorSchedules}
                            onEditSchedule={handleEditSchedule}
                            onDeleteSchedule={handleDeleteSchedule}
                        />
                    </div>

                    <div className="lg:hidden">
                        <ScheduleMobile
                            schedules={doctorSchedules}
                            onEditSchedule={handleEditSchedule}
                            onDeleteSchedule={handleDeleteSchedule}
                        />
                    </div>

                </>
            )}

            <Modal
                open={isModalOpen}
                title={editingSchedule ? "Editar horario" : "Nuevo horario"}
                subtitle={
                    editingSchedule
                        ? "Modifica la información del horario."
                        : "Agrega un nuevo horario para un médico."
                }
                onClose={handleCloseModal}
            >
                <ScheduleForm schedule={editingSchedule} doctorId={selectedDoctor} onCancel={handleCloseModal} />
            </Modal>

            <ConfirmDeleteModal
                open={isDeleteModalOpen}
                loading={isDeleting}
                message={
                    scheduleToDelete
                        ? `El horario del ${scheduleToDelete.dayOfWeek} (${scheduleToDelete.startTime} - ${scheduleToDelete.endTime}) será eliminado permanentemente. \nEsta acción no se puede deshacer.`
                        : ""
                }
                entity="horario"
                onCancel={handleCloseDeleteModal}
                onConfirm={() => {
                    if (!scheduleToDelete) return

                    deleteDoctorSchedule({ id: scheduleToDelete.id, doctorId: selectedDoctor }, {
                        onSuccess: handleCloseDeleteModal
                    })
                }}
            />

        </div>
    )
}