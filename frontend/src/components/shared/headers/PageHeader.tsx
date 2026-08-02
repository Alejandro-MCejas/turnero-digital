

interface PageHeaderProps {
    title: string
    subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="mb-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
                {subtitle && <p className="mt-2 text-base sm:text-lg text-slate-400">{subtitle}</p>}
            </div>
        </div>
    )
}