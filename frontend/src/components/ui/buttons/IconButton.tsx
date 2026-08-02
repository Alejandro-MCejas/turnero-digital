
const variants = {
    default: "hover:bg-slate-100 text-slate-600",
    danger: "hover:bg-red-100 text-red-600",
}

type Variant = keyof typeof variants

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: Variant
}

export default function IconButton({ children, variant = "default", className = "", ...props }: IconButtonProps) {
    return (
        <button type="button" className={`inline-flex items-center justify-center rounded-lg p-2 cursor-pointer transition-colors ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    )
}