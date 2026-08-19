import Button from "@/components/ui/buttons/Button";
import { CalendarDays, CreditCard, Mail, User } from "lucide-react";
import EditableProfileField from "../ui/EditableProfileField";
import { User as UserModel } from "@/types/models/user";
import { useState } from "react";
import { useUpdateCurrentUser } from "@/features/users/hooks/useUpdateCurrentUser";
import { UpdateUserDto } from "@/features/users/dto/updateUser.dto";


interface PersonalInformationCardProps {
    user: UserModel
}

interface ProfileFormData {
    name: string;
    email: string;
    birthDate: string;
    nDni: string;
}

const getFormData = (user: UserModel): ProfileFormData => ({
    name: user.name,
    email: user.email,
    birthDate: user.birthDate
        ? user.birthDate.split("T")[0]
        : "",
    nDni: user.nDni
});

export default function PersonalInformationCard({ user }: PersonalInformationCardProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<ProfileFormData>(() => getFormData(user));

    const { mutate: updateCurrentUser, isPending: isUpdating } = useUpdateCurrentUser();

    const originalData = getFormData(user);

    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

    const handleEdit = () => {

        if (isUpdating) return;

        setFormData(getFormData(user));
        setIsEditing(prev => !prev);
    };

    const handleSave = () => {

        if (!hasChanges || isUpdating) return;

        const updateData: UpdateUserDto = {
            name: formData.name,
            email: formData.email,
            birthDate: formData.birthDate,
            nDni: formData.nDni
        };

        updateCurrentUser(updateData, {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };


    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-slate-900 text-center sm:text-left">
                    Información personal
                </h2>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">

                    {isEditing && hasChanges && (
                        <Button
                            onClick={handleSave}
                            disabled={isUpdating}
                            className="justify-center sm:w-auto"
                        >
                            {isUpdating
                                ? "Guardando..."
                                : "Guardar cambios"
                            }
                        </Button>
                    )}

                    <Button
                        variant="secondary"
                        onClick={handleEdit}
                        disabled={isUpdating}
                        className="justify-center sm:w-auto"
                    >
                        {isEditing
                            ? "Cancelar"
                            : "Editar perfil"
                        }
                    </Button>

                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <EditableProfileField
                    icon={<User className="h-4 w-4" />}
                    label="Nombre"
                    value={formData.name}
                    disabled={!isEditing || isUpdating}
                    onChange={value => setFormData({ ...formData, name: value })}
                />

                <EditableProfileField
                    icon={<Mail className="h-4 w-4" />}
                    label="Correo electrónico"
                    value={formData.email}
                    disabled={!isEditing || isUpdating}
                    onChange={value => setFormData({ ...formData, email: value })}
                />

                <EditableProfileField
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Fecha de nacimiento"
                    value={formData.birthDate}
                    type="date"
                    disabled={!isEditing || isUpdating}
                    onChange={(value) =>
                        setFormData({
                            ...formData,
                            birthDate: value
                        })
                    }
                />

                <EditableProfileField
                    icon={<CreditCard className="h-4 w-4" />}
                    label="DNI"
                    value={formData.nDni}
                    disabled={!isEditing || isUpdating}
                    onChange={(value) => setFormData({ ...formData, nDni: value })}
                />

            </div>

        </section>
    );
}