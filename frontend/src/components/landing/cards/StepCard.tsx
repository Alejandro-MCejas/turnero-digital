

interface StepCardProps {
    number: number;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function StepCard({ number, icon, title, description }: StepCardProps) {
    return (
        <div className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm transition-all lg:hover:-translate-y-1 lg:hover:shadow-lg">
            
            <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                {number}
            </div>

            <div className="mx-auto mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                {icon}
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{title}</h3>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{description}</p>
        </div>
    );
}