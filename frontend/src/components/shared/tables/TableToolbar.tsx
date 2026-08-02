
interface TableToolbarProps {
    children: React.ReactNode
}

export default function TableToolbar({ children }: TableToolbarProps) {
    return (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            {children}
        </div>
    )
}