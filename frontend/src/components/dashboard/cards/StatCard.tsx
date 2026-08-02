import type { LucideIcon } from "lucide-react";
import Card from "../../ui/cards/Card";



const colors = {
    blue: {
        text: "text-blue-600",
        bg: "bg-blue-100",
    },
    green: {
        text: "text-green-600",
        bg: "bg-green-100",
    },
    violet: {
        text: "text-violet-600",
        bg: "bg-violet-100",
    },
    yellow: {
        text: "text-yellow-500",
        bg: "bg-yellow-100",
    },
}

interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon
    color: Color
    subtitle?: string
}

type Color = keyof typeof colors

export default function StatCard({ title, value, icon: Icon, color, subtitle }: StatCardProps) {
    return (
        <Card>
            <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 ${colors[color].bg} ${colors[color].text}`}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-1 text-3xl font-bold sm:text-4xl">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm text-green-600">{subtitle}</p>
                    )}
                </div>
            </div>
        </Card>
    )
}