"use client"

import DoctorCard from "@/components/doctors/cards/DoctorCard";
import DoctorForm from "@/components/doctors/forms/DoctorForm";
import DoctorItem from "@/components/doctors/table/DoctorItem";
import ConfirmDeleteModal from "@/components/shared/modals/ConfirmDeleteModal";
import EmptyState from "@/components/shared/empty-state/EmptyState";
import PageHeader from "@/components/shared/headers/PageHeader";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import Modal from "@/components/ui/overlay/Modal";
import Table from "@/components/ui/data-display/Table";
import { doctors } from "@/mocks/doctors";
import { Doctor } from "@/types/models/doctor";
import { Stethoscope } from "lucide-react";
import { useState } from "react";
import TableToolbar from "@/components/shared/tables/TableToolbar";


export default function DoctorsPage() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null)
    const [search, setSearch] = useState("")

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <PageHeader
                title="Médicos"
                subtitle="Gestiona los médicos del sistema"
            />

            <TableToolbar>
                <div className="flex flex-wrap gap-3">
                    <Input
                        placeholder="Buscar médico"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {search && (
                        <Button
                            variant="secondary"
                            onClick={() => setSearch("")}
                        >
                            Limpiar filtros
                        </Button>
                    )}
                </div>
                <Button onClick={() => {
                    setEditingDoctor(null)
                    setIsModalOpen(true)
                }}
                >
                    Nuevo médico
                </Button>
            </TableToolbar>



            {doctors.length === 0 ? (
                <EmptyState
                    icon={<Stethoscope className="h-14 w-14" />}
                    title="Todavía no hay médicos"
                    description="Comenzá agregando el primer médico al sistema."
                    action={
                        <Button onClick={() => setIsModalOpen(true)}>
                            Nuevo médico
                        </Button>
                    }
                />
            ) : filteredDoctors.length === 0 ? (
                <EmptyState
                    icon={<Stethoscope className="h-14 w-14" />}
                    title="No se encontraron médicos"
                    description="Probá modificando la búsqueda o limpiando los filtros."
                />
            ) : (
                <>
                    <div className="hidden lg:block">
                        <Table headers={["Nombre", "Especialidad", "Email", "Telefono", "Estado", "Acciones"]}
                            align={["left", "left", "left", "left", "center", "center"]}
                        >
                            {filteredDoctors.map(doctor => (
                                <DoctorItem
                                    key={doctor.id}
                                    doctor={doctor}
                                    onEdit={doctor => {
                                        setEditingDoctor(doctor)
                                        setIsModalOpen(true)
                                    }}
                                    onDelete={doctor => {
                                        setDoctorToDelete(doctor)
                                        setIsDeleteModalOpen(true)
                                    }}
                                />

                            ))}
                        </Table>
                    </div>

                    <div className="space-y-4 lg:hidden">
                        {filteredDoctors.map(doctor => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onEdit={doctor => {
                                    setEditingDoctor(doctor)
                                    setIsModalOpen(true)
                                }}
                                onDelete={doctor => {
                                    setDoctorToDelete(doctor)
                                    setIsDeleteModalOpen(true)
                                }}
                            />
                        ))}
                    </div>

                </>
            )
            }

            <Modal
                open={isModalOpen}
                title={editingDoctor ? "Editar médico" : "Nuevo médico"}
                subtitle={
                    editingDoctor
                        ? "Modifica la información del médico."
                        : "Completa la información para registrar un nuevo médico."
                }
                onClose={() => setIsModalOpen(false)}
            >
                <DoctorForm doctor={editingDoctor} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            <ConfirmDeleteModal
                open={isDeleteModalOpen}
                message={
                    doctorToDelete
                        ? `${doctorToDelete.name} será eliminado permanentemente. \nEsta acción no se puede deshacer.`
                        : ""
                }
                entity="médico"
                onCancel={() => {
                    setDoctorToDelete(null)
                    setIsDeleteModalOpen(false)
                }}
                onConfirm={() => {
                    setDoctorToDelete(null)
                    setIsDeleteModalOpen(false)
                }}
            />
        </div>
    )
}