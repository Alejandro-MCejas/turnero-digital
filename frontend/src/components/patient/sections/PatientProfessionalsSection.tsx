"use client"

import EmptyState from "@/components/shared/empty-state/EmptyState";
import PageHeader from "@/components/shared/headers/PageHeader";
import Loader from "@/components/ui/feedback/Loader";
import { useDoctors } from "@/features/doctors/hooks/useDoctors";
import { Stethoscope } from "lucide-react";
import DoctorScheduleCard from "../cards/DoctorScheduleCard";

export default function PatientProfessionalsSection() {

    const { data: doctors = [], isLoading, isError } = useDoctors();

    if (isLoading) {
        return (
            <Loader
                title="Cargando profesionales"
                description="Obteniendo los profesionales disponibles..."
            />
        )
    }

    if (isError) {
        return (
            <div className="space-y-8">
                <PageHeader
                    title="Profesionales"
                    subtitle="Conocé nuestros profesionales y sus horarios de atención."
                />

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <p className="text-sm text-red-600">
                        No se pudieron cargar los profesionales.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Profesionales"
                subtitle="Conocé nuestros profesionales y sus horarios de atención."
            />

            {doctors.length === 0 ? (
                <EmptyState
                    size="sm"
                    icon={<Stethoscope className="h-10 w-10" />}
                    title="No hay profesionales disponibles"
                    description="Actualmente no hay profesionales disponibles para consultar."
                />
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {doctors.map((doctor) => (
                        <DoctorScheduleCard
                            key={doctor.id}
                            doctor={doctor}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}