import { Doctor } from "@/types/models/doctor"
import Avatar from "../../ui/data-display/Avatar"
import Badge from "../../ui/data-display/Badge"
import { doctorStatusVariant } from "@/types/enums/doctorStatus"
import Button from "../../ui/buttons/Button"
import { Pencil, Trash } from "lucide-react"


interface DoctorCardProps {
    doctor: Doctor
    onEdit: (doctor: Doctor) => void
    onDelete: (doctor: Doctor) => void
}

export default function DoctorCard({ doctor, onEdit, onDelete }: DoctorCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

                <Avatar
                    name={doctor.name}
                    size="md"
                />

                <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold text-slate-900">
                        {doctor.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-600">
                        {doctor.specialty}
                    </p>

                </div>

            </div>

            <div className="mt-5 space-y-2">

                <p className="truncate text-sm text-slate-500">
                    {doctor.email}
                </p>

                <p className="text-sm text-slate-500">
                    {doctor.phone}
                </p>

            </div>

            <div className="mt-5">

                <Badge variant={doctorStatusVariant[doctor.status]}>
                    {doctor.status}
                </Badge>

            </div>

            <div className="mt-6 flex flex-col gap-2 sm:grid sm:grid-cols-2">

                <Button
                    variant="secondary"
                    className="flex-1 justify-center"
                    onClick={() => onEdit(doctor)}
                >
                    <Pencil className="h-4 w-4" />
                    Editar
                </Button>

                <Button
                    variant="danger"
                    className="flex-1 justify-center"
                    onClick={() => onDelete(doctor)}
                >
                    <Trash className="h-4 w-4" />
                    Eliminar
                </Button>

            </div>

        </article>
    )
}