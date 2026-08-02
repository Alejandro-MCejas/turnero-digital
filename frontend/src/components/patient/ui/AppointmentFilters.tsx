import Input from "@/components/ui/forms/Input";
import Select from "@/components/ui/forms/Select";



interface AppointmentFiltersProps {
    search: string
    status: string
    onSearchChange: (value: string) => void
    onStatusChange: (value: string) => void
    onSearchFocus?: () => void;
}

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

                <option value="Confirmado">
                    Confirmado
                </option>

                <option value="Pendiente">
                    Pendiente
                </option>

                <option value="Cancelado">
                    Cancelado
                </option>

            </Select>

        </div>
    )
}