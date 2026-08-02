import { User } from "@/types/models/user";
import Avatar from "../ui/data-display/Avatar";
import Badge from "../ui/data-display/Badge";
import Button from "../ui/buttons/Button";
import { Pencil, Trash } from "lucide-react";


interface UserItemProps {
    user: User
    onEdit: (user: User) => void
    onDelete: (user: User) => void
}

export default function UserItem({ user, onEdit, onDelete }: UserItemProps) {
    return (
        <tr key={user.id} className="border-t hover:bg-slate-100 transition-colors">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <Avatar name={user.name} size="sm" />
                    <span className="font-medium">{user.name}</span>
                </div>
            </td>
            <td className="px-6 py-5">{user.email}</td>
            <td className="px-6 py-5 text-center">
                <Badge variant={user.role === "admin" ? "primary" : "success"}>
                    {user.role === "admin" ? "Admin" : "User"}
                </Badge>
            </td>
            <td className="px-6 py-5">
                <div className="flex justify-center gap-2">
                    <Button variant="secondary" onClick={() => onEdit(user)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(user)}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </td>
        </tr>
    )
}