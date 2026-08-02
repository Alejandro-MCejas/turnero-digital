

interface EditableProfileFieldProps {
    icon?: React.ReactNode;
    label: string;
    value: string;
    disabled: boolean;
    onChange: (value: string) => void;
}

export default function EditableProfileField({ icon, label, value, disabled, onChange }: EditableProfileFieldProps) {
    return (
        <div className="space-y-1">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                {icon}
                <span>{label}</span>
            </div>

            <input
                type="text"
                value={value}
                disabled={disabled}
                onChange={e => onChange(e.target.value)}
                className="w-full
                rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed
                disabled:bg-slate-50 transition-colors"
            />
        </div>
    )
}