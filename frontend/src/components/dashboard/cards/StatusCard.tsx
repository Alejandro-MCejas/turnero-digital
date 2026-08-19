import DashboardSection from "../sections/DashboardSection";
import StatusProgress from "../ui/StatusProgress";
import { DashboardStats as DashboardStatsModel } from "@/types/models/dashboard";

interface StatusCardProps {
    byStatus: DashboardStatsModel["byStatus"]
    total: number
}

export default function StatusCard({ byStatus, total }: StatusCardProps) {

    const statuses = [
        {
            name: "Confirmados",
            value: byStatus.confirmed,
            color: "#22c55e",
        },
        {
            name: "Pendientes",
            value: byStatus.pending,
            color: "#eab308",
        },
        {
            name: "Cancelados",
            value: byStatus.cancelled,
            color: "#ef4444",
        },
        {
            name: "Completados",
            value: byStatus.completed,
            color: "#3b82f6",
        },
    ];

    const percentages = statuses.map(status => total > 0
        ? Math.round((status.value / total) * 100)
        : 0
    );

    const percentageTotal = percentages.reduce((sum, percentage) => sum + percentage, 0);

    if (total > 0 && percentageTotal !== 100) {
        const largestStatusIndex = statuses.reduce(
            (largestIndex, status, index) =>
                status.value > statuses[largestIndex].value
                    ? index
                    : largestIndex,
            0
        );

        percentages[largestStatusIndex] += 100 - percentageTotal;
    }

    return (
        <DashboardSection title="Turnos por estado">
            <div className="mb-6">
                <p className="text-4xl font-bold">{total}</p>
                <p className="text-slate-500">Turnos registrados</p>
            </div>

            <div className="space-y-6">
                {statuses.map((status, index) => {
                    return (
                        <StatusProgress
                            key={status.name}
                            color={status.color}
                            label={status.name}
                            value={status.value}
                            percentage={`${percentages[index]}%`}
                        />
                    )
                })}
            </div>
        </DashboardSection>
    )
}