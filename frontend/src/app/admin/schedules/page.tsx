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
import { schedules } from "@/mocks/schedules";
import { Schedule } from "@/types/models/schedule";
import { Clock3 } from "lucide-react";
import { useState } from "react";


export default function SchedulesPage() {

    const [selectedDoctor, setSelectedDoctor] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(null)

    const handleEditSchedule = (schedule: Schedule) => {
        setEditingSchedule(schedule)
        setIsModalOpen(true)
    }

    const handleDeleteSchedule = (schedule: Schedule) => {
        setScheduleToDelete(schedule)
        setIsDeleteModalOpen(true)
    }

    const doctorSchedules = schedules.filter(schedule => schedule.doctorId === selectedDoctor)

    return (
        <div className="space-y-6">
            <PageHeader title="Horarios" subtitle="Gestiona la disponibilidad de los médicos" />

            <ScheduleFilters
                selectedDoctor={selectedDoctor}
                onDoctorChange={setSelectedDoctor}
                onNewSchedule={() => {
                    setEditingSchedule(null)
                    setIsModalOpen(true)
                }}
            />

            {schedules.length === 0 ? (
                <EmptyState
                    icon={<Clock3 className="h-14 w-14" />}
                    title="Todavía no hay horarios"
                    description="Comenzá agregando el primer horario para un médico"
                    action={
                        <Button onClick={() => {
                            setEditingSchedule(null)
                            setIsModalOpen(true)
                        }}>
                            Nuevo horario
                        </Button>
                    }
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
                            doctorId={selectedDoctor}
                            onEditSchedule={handleEditSchedule}
                            onDeleteSchedule={handleDeleteSchedule}
                        />
                    </div>

                    <div className="lg:hidden">
                        <ScheduleMobile
                            doctorId={selectedDoctor}
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
                onClose={() => setIsModalOpen(false)}
            >
                <ScheduleForm schedule={editingSchedule} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            <ConfirmDeleteModal
                open={isDeleteModalOpen}
                message={
                    scheduleToDelete
                        ? `El horario del ${scheduleToDelete.day} (${scheduleToDelete.start} - ${scheduleToDelete.end}) será eliminado permanentemente. \nEsta acción no se puede deshacer.`
                        : ""
                }
                entity="horario"
                onCancel={() => {
                    setScheduleToDelete(null)
                    setIsDeleteModalOpen(false)
                }}
                onConfirm={() => {
                    setScheduleToDelete(null)
                    setIsDeleteModalOpen(false)
                }}
            />

        </div>
    )
}