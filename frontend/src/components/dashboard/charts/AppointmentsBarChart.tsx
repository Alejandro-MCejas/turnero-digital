"use client"
import { chartColors } from "@/constants/colors";
import { appointmentsPerDay } from "@/mocks/dashboard";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



export default function AppointmentsBarChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsPerDay} margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0
            }}>

                <CartesianGrid vertical={false} stroke="#cbd5e1" strokeDasharray="3 3" />

                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{
                    fill: "#334155",
                    fontSize: 13,
                    fontWeight: 500,
                }} />

                <YAxis width={30} axisLine={false} tickLine={false} tick={{
                    fill: "#334155",
                    fontSize: 13,
                    fontWeight: 500,
                }} />

                <Tooltip cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#fff",
                    }} />
                    
                <Bar
                    dataKey="appointments"
                    name="Turnos"
                    fill={chartColors.primary}
                    radius={[8, 8, 0, 0]} barSize={28}
                    isAnimationActive
                    animationDuration={400}
                    activeBar={{
                        fill: "#4338ca"
                    }}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}