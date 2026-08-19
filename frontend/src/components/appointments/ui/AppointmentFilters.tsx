import Input from "../../ui/forms/Input";
import Select from "../../ui/forms/Select";
import Button from "../../ui/buttons/Button";
import { useDoctors } from "@/features/doctors/hooks/useDoctors";
import { appointmentStatus } from "@/types/enums/appointmentStatus";

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

    const { data: doctors = [], isLoading: isLoadingDoctors } = useDoctors()


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
                <option value={appointmentStatus.CONFIRMED}>Confirmado</option>
                <option value={appointmentStatus.PENDING}>Pendiente</option>
                <option value={appointmentStatus.CANCELLED}>Cancelado</option>
                <option value={appointmentStatus.COMPLETED}>Completado</option>
            </Select>

            <Select
                className="w-44"
                value={doctorFilter}
                onChange={(e) => onDoctorChange(e.target.value)}
                disabled={isLoadingDoctors}
            >
                <option value="">
                    {isLoadingDoctors ? "Cargando médicos..." : "Todos los médicos"}
                </option>

                {doctors.map((doctor) => (
                    <option
                        key={doctor.id}
                        value={doctor.id}
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
                    type="button"
                    variant="secondary"
                    onClick={onClearFilters}
                >
                    Limpiar filtros
                </Button>
            )}
        </div>
    )
}