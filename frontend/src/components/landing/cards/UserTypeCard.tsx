


interface UserTypeCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    items: string[];
}

export default function UserTypeCard({ icon, title, description, items }: UserTypeCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all lg:hover:-translate-y-1 lg:hover:shadow-lg">
            <div className="mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                {icon}
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">{title}</h3>

            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{description}</p>

            <ul className="mt-5 space-y-2 sm:mt-6 sm:space-y-3">
                {items.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700 sm:items-center sm:text-base">
                        <span className="font-semibold text-violet-600">✓</span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}