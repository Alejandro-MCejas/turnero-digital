import Input from "@/components/ui/forms/Input";
import Select from "@/components/ui/forms/Select";
import { appointmentStatusLabel } from "@/constants/status/appointmentStatusLabel";
import { AppointmentStatus, appointmentStatus } from "@/types/enums/appointmentStatus";


interface AppointmentFiltersProps {
    search: string
    status: string
    onSearchChange: (value: string) => void
    onStatusChange: (value: string) => void
    onSearchFocus?: () => void;
}

const statusOptions: AppointmentStatus[] = [
    appointmentStatus.CONFIRMED,
    appointmentStatus.PENDING,
    appointmentStatus.CANCELLED,
    appointmentStatus.COMPLETED
]

export default function AppointmentFilters({ search, status, onSearchChange, onStatusChange, onSearchFocus }: AppointmentFiltersProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

            <Input
                placeholder="Buscar por médico o especialidad..."
                value={search}
                onFocus={onSearchFocus}
                onChange={e => onSearchChange(e.target.value)}
                className="w-full md:max-w-sm"
            />

            <Select
                value={status}
                onChange={e => onStatusChange(e.target.value)}
                className="w-full md:w-52"
            >

                <option value="">
                    Todos los estados
                </option>

                {statusOptions.map(status => (
                    <option key={status} value={status}>
                        {appointmentStatusLabel[status]}
                    </option>
                ))}


            </Select>

        </div>
    )
}