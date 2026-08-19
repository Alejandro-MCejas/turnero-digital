import { User } from "@/types/models/user"
import Avatar from "../ui/data-display/Avatar"
import Badge from "../ui/data-display/Badge"
import Button from "../ui/buttons/Button"
import { Pencil, ShieldCheck, Trash } from "lucide-react"


interface UserCardProps {
    user: User
    onEdit: (user: User) => void
    onDelete: (user: User) => void
    onChangeRole: (user: User) => void
}

export default function UserCard({ user, onEdit, onDelete, onChangeRole }: UserCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

                <Avatar name={user.name} size="md" />

                <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold">{user.name}</h3>

                    <p className="mt-1 truncate text-sm text-slate-500">{user.email}</p>

                </div>

            </div>

            <div className="mt-3">

                <Badge variant={user.role === "admin" ? "primary" : "success"}>
                    {user.role === "admin" ? "Admin" : "User"}
                </Badge>

            </div>

            <div className="mt-6 flex flex-col gap-2 sm:grid sm:grid-cols-2">

                <Button
                    variant="secondary"
                    className="flex-1 justify-center"
                    onClick={() => onEdit(user)}
                >
                    <Pencil className="h-4 w-4" />
                    Editar
                </Button>

                <Button
                    variant="primary"
                    className="flex-1 justify-center"
                    onClick={() => onChangeRole(user)}
                >
                    <ShieldCheck className="h-4 w-4" />
                    Rol
                </Button>

                <Button
                    variant="danger"
                    className="flex-1 justify-center"
                    onClick={() => onDelete(user)}
                >
                    <Trash className="h-4 w-4" />
                    Eliminar
                </Button>

            </div>

        </article>
    )
}