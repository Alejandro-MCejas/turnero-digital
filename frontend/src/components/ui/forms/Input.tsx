
type InputProps = React.InputHTMLAttributes<HTMLInputElement>


export default function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-700 focus:ring-2 focus:ring-slate-200 ${className}`}
        />
    )
}