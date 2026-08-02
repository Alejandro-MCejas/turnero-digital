
interface FormFieldProps{
    label: string
    children: React.ReactNode
}


export default function FormField({ label, children }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">{label}</label>
            {children}
        </div>
    )
}