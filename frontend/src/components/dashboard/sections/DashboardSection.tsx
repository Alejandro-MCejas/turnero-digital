import Card from "../../ui/cards/Card"

interface DashboardSectionProps {
    title: string
    children: React.ReactNode
    action?: React.ReactNode
}


export default function DashboardSection({ title, children, action }: DashboardSectionProps) {
    return (
        <Card>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold">{title}</h2>
                {action}
            </div>
            {children}
        </Card>
    )
}