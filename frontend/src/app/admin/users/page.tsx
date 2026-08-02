"use client"

import ConfirmDeleteModal from "@/components/shared/modals/ConfirmDeleteModal";
import EmptyState from "@/components/shared/empty-state/EmptyState";
import PageHeader from "@/components/shared/headers/PageHeader";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import Modal from "@/components/ui/overlay/Modal";
import Table from "@/components/ui/data-display/Table";
import UserCard from "@/components/users/UserCard";
import UserForm from "@/components/users/UserForm";
import UserItem from "@/components/users/UserItem";
import { users } from "@/mocks/users";
import { User } from "@/types/models/user";
import { Users } from "lucide-react";
import { useState } from "react";
import TableToolbar from "@/components/shared/tables/TableToolbar";


export default function UsersPage() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)
    const [search, setSearch] = useState("")

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <div className="space-y-6">
            <PageHeader
                title="Usuarios"
                subtitle="Gestiona los usuarios del sistema"
            />
            <TableToolbar>
                <div className="flex flex-wrap gap-3">
                    <Input
                        placeholder="Buscar usuario"
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
                    setEditingUser(null)
                    setIsModalOpen(true)
                }}
                >
                    Nuevo usuario
                </Button>
            </TableToolbar>


            {users.length === 0 ? (
                <EmptyState
                    icon={<Users className="h-14 w-14" />}
                    title="Todavía no hay usuarios"
                    description="Comenzá agregando el primer usuario al sistema."
                    action={
                        <Button onClick={() => setIsModalOpen(true)}>
                            Nuevo usuario
                        </Button>
                    }
                />
            ) : filteredUsers.length === 0 ? (
                <EmptyState
                    icon={<Users className="h-14 w-14" />}
                    title="No se encontraron usuarios"
                    description="Probá modificando la búsqueda o limpiando los filtros."
                />
            ) : (
                <>
                    <div className="hidden lg:block">
                        <Table headers={["Nombre", "Email", "Rol", "Acciones"]}
                            align={["left", "left", "center", "center"]}
                        >
                            {filteredUsers.map(user => (
                                <UserItem
                                    key={user.id}
                                    user={user}
                                    onEdit={user => {
                                        setEditingUser(user)
                                        setIsModalOpen(true)
                                    }}
                                    onDelete={user => {
                                        setUserToDelete(user)
                                        setIsDeleteModalOpen(true)
                                    }}
                                />
                            ))}
                        </Table>
                    </div>

                    <div className="space-y-4 lg:hidden">
                        {filteredUsers.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onEdit={user => {
                                    setEditingUser(user)
                                    setIsModalOpen(true)
                                }}
                                onDelete={user => {
                                    setUserToDelete(user)
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
                title={editingUser ? "Editar usuario" : "Nuevo usuario"}
                subtitle={
                    editingUser
                        ? "Modifica la información del usuario."
                        : "Completa la información para registrar un nuevo usuario."

                }
                onClose={() => setIsModalOpen(false)}
            >
                <UserForm user={editingUser} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            <ConfirmDeleteModal
                open={isDeleteModalOpen}
                message={
                    userToDelete
                        ? `${userToDelete.name} será eliminado permanentemente.\nEsta acción no se puede deshacer.`
                        : ""
                }
                entity="usuario"
                onCancel={() => {
                    setUserToDelete(null)
                    setIsDeleteModalOpen(false)
                }}
                onConfirm={() => {
                    setUserToDelete(null)
                    setIsDeleteModalOpen(false)
                }}
            />

        </div >
    )
}