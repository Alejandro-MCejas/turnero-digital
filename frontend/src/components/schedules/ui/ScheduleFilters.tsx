import TableToolbar from "@/components/shared/tables/TableToolbar";
import Button from "../../ui/buttons/Button";
import Select from "../../ui/forms/Select";

interface ScheduleFiltersProps {
    selectedDoctor: number;
    onDoctorChange: (doctorId: number) => void;
    onNewSchedule: () => void
}

export default function ScheduleFilters({ selectedDoctor, onDoctorChange, onNewSchedule }: ScheduleFiltersProps) {
     // TODO: implementar filtro por semana cuando los horarios provengan del backend.
    return (
        <TableToolbar>
            <div className="flex flex-col gap-3 sm:flex-row">
                <Select
                    className="w-full md:w-60"
                    value={selectedDoctor}
                    onChange={e => onDoctorChange(Number(e.target.value))}
                >
                    <option value={1}>Dr. Juan Martínez</option>
                    <option value={2}>Dra. Ana López</option>
                </Select>

                <Select className="w-full md:w-60">
                    <option>23 - 29 Junio</option>
                    <option>30 - 6 Julio</option>
                </Select>
            </div>

            <Button onClick={onNewSchedule}>Nuevo horario</Button>
        </TableToolbar>
    )
}