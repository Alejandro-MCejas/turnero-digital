import { LucideIcon } from "lucide-react"


interface AppointmentInfoItemProps {
    icon: LucideIcon
    label: string
    value: string
}

export default function AppointmentInfoItem({ icon: Icon, label, value }: AppointmentInfoItemProps) {
    return (
        <div className="flex items-center gap-3">

            <Icon className="h-5 w-5 text-violet-600" />

            <div>

                <p className="text-sm text-slate-500">
                    {label}
                </p>

                <p className="font-medium">
                    {value}
                </p>

            </div>

        </div>
    );
}