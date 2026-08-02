import { Doctor } from "@/types/models/doctor"
import Button from "../../ui/buttons/Button"
import FormActions from "../../ui/forms/FormActions"
import FormField from "../../ui/forms/FormField"
import Input from "../../ui/forms/Input"
import Select from "../../ui/forms/Select"



interface DoctorFormProps {
    doctor?: Doctor | null
    onCancel: () => void
}

export default function DoctorForm({ doctor, onCancel }: DoctorFormProps) {
    return (
        <form className="space-y-5">
            <FormField label="Nombre">
                <Input defaultValue={doctor?.name} placeholder="Juan Martínez" />
            </FormField>

            <FormField label="Especialidad">
                <Input defaultValue={doctor?.specialty} placeholder="Cardiología" />
            </FormField>

            <FormField label="Email">
                <Input defaultValue={doctor?.email} placeholder="doctor@email.com" />
            </FormField>

            <FormField label="Teléfono">
                <Input defaultValue={doctor?.phone} placeholder="12345678" />
            </FormField>

            <FormField label="Estado">
                <Select className="w-full" defaultValue={doctor?.status}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </Select>
            </FormField>

            <FormActions>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={onCancel}
                    className="justify-center sm:w-auto"
                >
                    Cancelar
                </Button>

                <Button className="justify-center sm:w-auto">
                    {doctor ? "Actualizar" : "Guardar"}
                </Button>
            </FormActions>
        </form>
    )
}