import TableToolbar from "@/components/shared/tables/TableToolbar";
import Button from "../../ui/buttons/Button";
import Select from "../../ui/forms/Select";
import { Doctor } from "@/types/models/doctor";

interface ScheduleFiltersProps {
    doctors: Doctor[]
    selectedDoctor: string;
    onDoctorChange: (doctorId: string) => void;
    onNewSchedule: () => void
}

export default function ScheduleFilters({ doctors, selectedDoctor, onDoctorChange, onNewSchedule }: ScheduleFiltersProps) {
    return (
        <TableToolbar>
            <Select
                className="w-full md:w-60"
                value={selectedDoctor}
                onChange={e => onDoctorChange(e.target.value)}
            >
                <option value="">Seleccionar médico</option>

                {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                    </option>
                ))}
            </Select>

            <Button onClick={onNewSchedule}>Nuevo horario</Button>
        </TableToolbar>
    )
}