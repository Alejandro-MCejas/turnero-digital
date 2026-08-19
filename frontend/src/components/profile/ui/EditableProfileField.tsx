

interface EditableProfileFieldProps {
    icon?: React.ReactNode;
    label: string;
    value: string;
    disabled: boolean;
    type?: string;
    onChange: (value: string) => void;
}

export default function EditableProfileField({ icon, label, value, disabled, type, onChange }: EditableProfileFieldProps) {
    return (
        <div className="space-y-1">
            <div className={`
                mb-1 flex items-center gap-2 text-sm font-medium
                ${disabled ? "text-slate-500" : "text-violet-600"}
            `}
            >
                {icon}
                <span>{label}</span>
            </div>

            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={e => onChange(e.target.value)}
                className={`
                    w-full rounded-lg border px-4 py-3 text-slate-800 outline-none transition-colors
                    ${disabled
                        ? "cursor-not-allowed border-slate-200 bg-slate-50"
                        : "border-violet-300 bg-white ring-1 ring-violet-100"
                    }
                    focus:border-violet-500 focus:ring-2 focus:ring-violet-200
                `}
            />
        </div>
    )
}