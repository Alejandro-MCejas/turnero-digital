
const baseClass = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-slate-500"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export default function Select({ children, className = "", ...props }: SelectProps) {
    return (
        <select className={`${baseClass} ${className}`} {...props}>
            {children}
        </select>
    )
}