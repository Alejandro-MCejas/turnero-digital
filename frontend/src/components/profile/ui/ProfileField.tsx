interface ProfileFieldProps {
    icon?: React.ReactNode;
    label: string;
    value: string;
}

export default function ProfileField({
    icon,
    label,
    value,
}: ProfileFieldProps) {

    return (
        <div className="space-y-1">

            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                {icon}
                <span>{label}</span>
            </div>

            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
                {value}
            </p>

        </div>
    );
}