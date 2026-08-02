import { Clock } from "lucide-react";



interface ScheduleCardProps {
    start: string;
    end: string;
    children?: React.ReactNode
    actionsClassName?: string
}

export default function ScheduleCard({ start, end, children, actionsClassName }: ScheduleCardProps) {
    return (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="mb-2 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Disponible</span>
            </div>

            <p className="mt-2 text-center text-base font-bold text-slate-800">{start} - {end}</p>

            {children && (
                <div className={`mt-3 ${actionsClassName ?? ""}`}>{children}</div>
            )}
        </div>
    )
}