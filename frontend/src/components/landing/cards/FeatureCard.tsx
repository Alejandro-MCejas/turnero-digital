

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all lg:hover:-translate-y-1 lg:hover:shadow-lg">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                {icon}
            </div>

            <h3 className="text-xl font-semibold text-slate-900">
                {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">{description}</p>
        </div>
    );
}