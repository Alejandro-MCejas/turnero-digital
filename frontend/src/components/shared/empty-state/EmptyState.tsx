

interface EmptyStateProps {
    icon?: React.ReactNode
    title: string
    description: string
    action?: React.ReactNode
    size?: "md" | "sm"
}

const sizes = {
    sm: {
        container: "px-6 py-10",
        icon: "mb-4",
        title: "text-lg",
        description: "max-w-sm",
        action: "mt-6",
    },
    md: {
        container: "px-8 py-16",
        icon: "mb-5",
        title: "text-xl",
        description: "max-w-md",
        action: "mt-8",
    },
}

export default function EmptyState({ icon, title, description, action, size = "md" }: EmptyStateProps) {

    const styles = sizes[size]

    return (
        <div className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center ${styles.container}`}>
            {icon && (
                <div className={`text-slate-400 ${styles.icon}`}>{icon}</div>
            )}

            <h3 className={`font-semibold text-slate-700 ${styles.title}`}>{title}</h3>

            <p className={`mt-2 text-sm leading-relaxed text-slate-500 ${styles.description}`}>{description}</p>

            {action && (
                <div className={`${styles.action}`}>{action}</div>
            )}
        </div>
    )
}