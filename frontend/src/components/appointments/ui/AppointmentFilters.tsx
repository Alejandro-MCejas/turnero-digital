import { doctors } from "@/mocks/doctors";
import Input from "../../ui/forms/Input";
import Select from "../../ui/forms/Select";
import Button from "../../ui/buttons/Button";

interface AppointmentFiltersProps {
    search: string;
    statusFilter: string;
    doctorFilter: string;
    dateFilter: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onDoctorChange: (value: string) => void;
    onDateChange: (value: string) => void;

    onClearFilters: () => void;
}

export default function AppointmentFilters({
    search,
    statusFilter,
    doctorFilter,
    dateFilter,
    onSearchChange,
    onStatusChange,
    onDoctorChange,
    onDateChange,
    onClearFilters,
}: AppointmentFiltersProps) {
    return (
        <div className="flex flex-wrap gap-3">
            <Input
                type="text"
                placeholder="Buscar turno"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-72"
            />

            <Select
                className="w-44"
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value="">Todos los estados</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Completado">Completado</option>
            </Select>

            <Select
                className="w-44"
                value={doctorFilter}
                onChange={(e) => onDoctorChange(e.target.value)}
            >
                <option value="">Todos los médicos</option>

                {doctors.map((doctor) => (
                    <option
                        key={doctor.id}
                        value={doctor.name}
                    >
                        {doctor.name}
                    </option>
                ))}
            </Select>

            <Input
                type="date"
                className="w-40"
                value={dateFilter}
                onChange={(e) => onDateChange(e.target.value)}
            />

            {(search || statusFilter || doctorFilter || dateFilter) && (
                <Button
                    variant="secondary"
                    onClick={onClearFilters}
                >
                    Limpiar filtros
                </Button>
            )}
        </div>
    )
}