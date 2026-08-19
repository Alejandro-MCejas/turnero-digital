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
import { User } from "@/types/models/user";
import { Users } from "lucide-react";
import { useState } from "react";
import TableToolbar from "@/components/shared/tables/TableToolbar";
import { useUsers } from "@/features/users/hooks/useUsers";
import Loader from "@/components/ui/feedback/Loader";
import { useDeleteUser } from "@/features/users/hooks/useDeleteUser";
import ChangeUserRoleModal from "@/components/users/ChangeUserRoleModal";


export default function UsersPage() {

    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)
    const [search, setSearch] = useState("")
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
    const [userToChangeRole, setUserToChangeRole] = useState<User | null>(null)

    const { data: allUsers = [], isLoading, isError } = useUsers()

    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()

    if (isLoading) {
        return (
            <Loader title="Cargando usuarios" description="Obteniendo información..." />
        )
    }

    if (isError) {
        return (
            <EmptyState
                icon={<Users className="h-14 w-14" />}
                title="Error al cargar usuarios"
                description="No fue posible obtener la lista de usuarios."
            />
        )
    }

    const filteredUsers = allUsers.filter(user =>
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
            </TableToolbar>


            {allUsers.length === 0 ? (
                <EmptyState
                    icon={<Users className="h-14 w-14" />}
                    title="Todavía no hay usuarios"
                    description="Comenzá agregando el primer usuario al sistema."
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
                                    onEdit={user => setEditingUser(user)}
                                    onDelete={user => {
                                        setUserToDelete(user)
                                        setIsDeleteModalOpen(true)
                                    }}
                                    onChangeRole={(user) => {
                                        setUserToChangeRole(user)
                                        setIsRoleModalOpen(true)
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
                                onEdit={user => setEditingUser(user)}
                                onDelete={user => {
                                    setUserToDelete(user)
                                    setIsDeleteModalOpen(true)
                                }}
                                onChangeRole={(user) => {
                                    setUserToChangeRole(user)
                                    setIsRoleModalOpen(true)
                                }}
                            />
                        ))}
                    </div>
                </>
            )
            }

            <Modal
                open={!!editingUser}
                title={"Editar usuario"}
                subtitle="Modifica la información del usuario."
                onClose={() => setEditingUser(null)}
            >
                <UserForm user={editingUser} onCancel={() => setEditingUser(null)} />
            </Modal>

            <ConfirmDeleteModal
                open={isDeleteModalOpen}
                loading={isDeleting}
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
                    if (!userToDelete) return

                    deleteUser(userToDelete.id, {
                        onSuccess: () => {
                            setUserToDelete(null)
                            setIsDeleteModalOpen(false)
                        }
                    })
                }}
            />

            <ChangeUserRoleModal
                open={isRoleModalOpen}
                user={userToChangeRole}
                onClose={() => {
                    setUserToChangeRole(null)
                    setIsRoleModalOpen(false)
                }}
            />

        </div >
    )
}