import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickActionCardProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
}

export default function QuickActionCard({ title, description, href, icon: Icon }: QuickActionCardProps) {
    return (
        <Link
            href={href}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >

            <Icon className="mb-4 h-10 w-10 text-violet-600" />

            <h3 className="text-lg font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                {description}
            </p>

            <div className="mt-6 flex justify-end">

                <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1" />

            </div>

        </Link>
    )
}