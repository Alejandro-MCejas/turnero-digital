import { Profile } from "@/types/models/profile";
import Button from "@/components/ui/buttons/Button";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import EditableProfileField from "../ui/EditableProfileField";
import { toast } from "sonner";


interface PersonalInformationCardProps {
    user: Profile
    setUser: Dispatch<SetStateAction<Profile>>

    originalUser: Profile;
    setOriginalUser: Dispatch<SetStateAction<Profile>>;

    isEditing: boolean
    setIsEditing: Dispatch<SetStateAction<boolean>>


}

export default function PersonalInformationCard({
    user,
    setUser,
    originalUser,
    setOriginalUser,
    isEditing,
    setIsEditing,
}: PersonalInformationCardProps) {

    function handleSave() {
        setOriginalUser(user);
        setIsEditing(false);

        toast.success("Perfil actualizado correctamente");
    }

    function handleEdit() {

        if (!isEditing) {
            setOriginalUser(user);
            setIsEditing(true);
            return;
        }

        setUser(originalUser);
        setIsEditing(false);
    }

    const hasChanges = JSON.stringify(user) !== JSON.stringify(originalUser);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                    Información personal
                </h2>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">

                    {isEditing && hasChanges && (
                        <Button
                            onClick={handleSave}
                            className="justify-center sm:w-auto"
                        >
                            Guardar cambios
                        </Button>
                    )}

                    <Button
                        variant="secondary"
                        onClick={handleEdit}
                        className="justify-center sm:w-auto"
                    >
                        {isEditing ? "Cancelar" : "Editar perfil"}
                    </Button>

                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <EditableProfileField
                    icon={<User className="h-4 w-4" />}
                    label="Nombre"
                    value={user.firstName}
                    disabled={!isEditing}
                    onChange={value => setUser({ ...user, firstName: value })}
                />

                <EditableProfileField
                    label="Apellido"
                    value={user.lastName}
                    disabled={!isEditing}
                    onChange={value => setUser({ ...user, lastName: value })}
                />

                <EditableProfileField
                    icon={<Mail className="h-4 w-4" />}
                    label="Correo electrónico"
                    value={user.email}
                    disabled={!isEditing}
                    onChange={value => setUser({ ...user, email: value })}
                />

                <EditableProfileField
                    icon={<Phone className="h-4 w-4" />}
                    label="Teléfono"
                    value={user.phone}
                    disabled={!isEditing}
                    onChange={value => setUser({ ...user, phone: value })}
                />

                <div className="md:col-span-2">
                    <EditableProfileField
                        icon={<MapPin className="h-4 w-4" />}
                        label="Dirección"
                        value={user.address}
                        disabled={!isEditing}
                        onChange={value => setUser({ ...user, address: value })}
                    />
                </div>

            </div>

        </section>
    );
}