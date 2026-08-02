import { User } from "@/types/models/user"
import Button from "../ui/buttons/Button"
import FormActions from "../ui/forms/FormActions"
import FormField from "../ui/forms/FormField"
import Input from "../ui/forms/Input"
import Select from "../ui/forms/Select"


interface UserFormProps {
    user?: User | null
    onCancel: () => void
}

export default function UserForm({ user, onCancel }: UserFormProps) {
    return (
        <form className="space-y-5">
            <FormField label="Nombre">
                <Input defaultValue={user?.name} placeholder="Juan Pérez" />
            </FormField>

            <FormField label="Email">
                <Input type="email" defaultValue={user?.email} placeholder="juan.perez@email.com" />
            </FormField>

            <FormField label="Rol">
                <Select className="w-full" defaultValue={user?.role}>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </Select>
            </FormField>

            <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Contraseña">
                    <Input type="password" placeholder="******" />
                </FormField>

                <FormField label="Confirmar contraseña">
                    <Input type="password" placeholder="******" />
                </FormField>
            </div>

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
                        {user ? "Actualizar" : "Guardar"}
                    </Button>
                </FormActions>
        </form>
    )
}