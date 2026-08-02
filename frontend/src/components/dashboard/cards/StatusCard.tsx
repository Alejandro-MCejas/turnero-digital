import { status } from "@/mocks/dashboard";
import DashboardSection from "../sections/DashboardSection";
import StatusProgress from "../ui/StatusProgress";
import Select from "../../ui/forms/Select";

export default function StatusCard() {
    const total = status.reduce((acc, item) => acc + item.value, 0)
    return (
        <DashboardSection title="Turnos por estado" action={
            <Select>
                <option>Este mes</option>
            </Select>
        }>
            <div className="mb-6">
                <p className="text-4xl font-bold">{total}</p>
                <p className="text-slate-500">Turnos registrados</p>
            </div>

            <div className="space-y-6">
                {status.map(item => (
                    <StatusProgress
                        key={item.name}
                        color={item.fill}
                        label={item.name}
                        value={item.value}
                        percentage={item.percentage}
                    />
                ))}
            </div>
        </DashboardSection>
    )
}