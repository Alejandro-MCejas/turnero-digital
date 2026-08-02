import Button from "../../ui/buttons/Button";
import Input from "../../ui/forms/Input";
import Select from "../../ui/forms/Select";
import FormField from "../../ui/forms/FormField";
import FormActions from "../../ui/forms/FormActions";
import { Schedule } from "@/types/models/schedule";

interface ScheduleFormProps {
    schedule?: Schedule | null
    onCancel: () => void
}

export default function ScheduleForm({ schedule, onCancel }: ScheduleFormProps) {
    return (
        <form className="space-y-5">
            <FormField label="Médico">
                <Select className="w-full" defaultValue={schedule?.doctorId}>
                    <option>Seleccionar médico</option>
                    <option value={1}>Dr. Juan Martínez</option>
                    <option value={2}>Dra. Ana López</option>
                </Select>
            </FormField>

            <FormField label="Día">
                <Select className="w-full" defaultValue={schedule?.day}>
                    <option>Seleccionar día</option>
                    <option>Lunes</option>
                    <option>Martes</option>
                    <option>Miércoles</option>
                    <option>Jueves</option>
                    <option>Viernes</option>
                    <option>Sábado</option>
                    <option>Domingo</option>
                </Select>
            </FormField>


            <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Hora inicio">
                    <Input defaultValue={schedule?.start} type="time" />
                </FormField>
                <FormField label="Hora fin">
                    <Input defaultValue={schedule?.end} type="time" />
                </FormField>
            </div>

            <FormActions>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    type="button"
                    className="justify-center sm:w-auto"
                >
                    Cancelar
                </Button>

                <Button className="justify-center sm:w-auto">
                    {schedule ? "Actualizar" : "Guardar"}
                </Button>
            </FormActions>
        </form>
    )
}