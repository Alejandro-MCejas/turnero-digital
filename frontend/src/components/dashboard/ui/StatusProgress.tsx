

interface StatusProgressProps {
    color: string;
    label: string;
    value: number;
    percentage: string;
}

export default function StatusProgress({ color, label, value, percentage }: StatusProgressProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="font-medium text-slate-700">{label}</span>
                </div>

                <div className="text-right">
                    <span className="font-semibold">{value}</span>
                    <span className="ml-2 text-sm text-slate-500">{percentage}</span>
                </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full transition-all duration-500" style={{width: percentage, backgroundColor: color}} />
            </div>
        </div>
    )
}