"use client"

import { Appointment } from "@/types/models/appointment"
import Button from "../../ui/buttons/Button"
import FormActions from "../../ui/forms/FormActions"
import FormField from "../../ui/forms/FormField"
import Input from "../../ui/forms/Input"
import Select from "../../ui/forms/Select"
import { doctors } from "@/mocks/doctors"
import { patients } from "@/mocks/patients"


interface AppointmentFormProps {
    appointment?: Appointment | null
    onCancel: () => void
}

export default function AppointmentForm({ appointment, onCancel }: AppointmentFormProps) {
    return (
        <form className="space-y-7">
            <FormField label="Paciente">
                <Select className="w-full" defaultValue={appointment?.patient}>
                    <option>Seleccionar paciente</option>
                    {patients.map(patient => (
                        <option key={patient.id} value={patient.name}>
                            {patient.name}
                        </option>
                    ))}
                </Select>
            </FormField>

            <FormField label="Médico">
                <Select className="w-full" defaultValue={appointment?.doctor}>
                    <option>Seleccionar médico</option>
                    {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.name}>
                            {doctor.name}
                        </option>
                    ))}
                </Select>
            </FormField>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Fecha">
                    <Input defaultValue={appointment?.date} type="date" />
                </FormField>

                <FormField label="Hora">
                    <Input defaultValue={appointment?.time} type="time" />
                </FormField>
            </div>

            <FormField label="Estado">
                <Select className="w-full" defaultValue={appointment?.status}>
                    <option >Seleccionar un estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Completado">Completado</option>
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
                    {appointment ? 'Actualizar' : 'Guardar'}
                </Button>
            </FormActions>
        </form>
    )
}