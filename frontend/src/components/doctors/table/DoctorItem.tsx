import { Doctor } from "@/types/models/doctor";
import Avatar from "../../ui/data-display/Avatar";
import Button from "../../ui/buttons/Button";
import { Pencil, Trash } from "lucide-react";


interface DoctorItemProps {
    doctor: Doctor
    onEdit: (doctor: Doctor) => void
    onDelete: (doctor: Doctor) => void
}

export default function DoctorItem({ doctor, onEdit, onDelete }: DoctorItemProps) {
    return (
        <tr key={doctor.id} className="border-t hover:bg-slate-100 transition-colors">
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <Avatar name={doctor.name} size="sm" />
                    <span className="font-medium">{doctor.name}</span>
                </div>
            </td>
            <td className="px-6 py-5">{doctor.specialty}</td>
            <td className="px-6 py-5">
                <div className="flex justify-center gap-2">
                    <Button variant="secondary" onClick={() => onEdit(doctor)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(doctor)}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </td>
        </tr>
    );
}