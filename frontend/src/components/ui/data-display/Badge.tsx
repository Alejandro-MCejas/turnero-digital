
const baseClasses = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"

const variants = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-cyan-100 text-cyan-800",
}

type Variant = keyof typeof variants

interface BadgeProps {
    children: React.ReactNode
    variant?: Variant
    className?: string
}

export default function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
    return (
        <span className={`${baseClasses} ${variants[variant]} ${className}`}>
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current"></span>
            {children}
        </span>
    )
}