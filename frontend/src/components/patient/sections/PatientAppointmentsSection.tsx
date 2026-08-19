"use client"

import PageHeader from "@/components/shared/headers/PageHeader";
import AppointmentCard from "../cards/AppointmentCard";
import AppointmentFilters from "../ui/AppointmentFilters";
import { useRef, useState } from "react";
import EmptyState from "@/components/shared/empty-state/EmptyState";
import { CalendarSearch } from "lucide-react";
import { useMyAppointments } from "@/features/appointments/hooks/useMyAppointments";
import Loader from "@/components/ui/feedback/Loader";



export default function PatientAppointmentsSection() {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const resultsRef = useRef<HTMLDivElement>(null);

    const { data: appointments = [], isLoading, isError } = useMyAppointments()

    function handleSearchFocus() {
        if (window.innerWidth >= 768) return;

        setTimeout(() => {
            if (!resultsRef.current) return;

            const top =
                resultsRef.current.getBoundingClientRect().top +
                window.scrollY -
                180;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }, 250);
    }

    if (isLoading) {
        return (
            <Loader
                title="Cargando tus turnos"
                description="Obteniendo información..."
            />
        )
    }

    if (isError) {
        return (
            <div className="space-y-8">

                <PageHeader
                    title="Mis turnos"
                    subtitle="Consultá tus próximos turnos e historial."
                />

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <p className="text-sm text-red-600">No se pudieron cargar tus turnos.</p>
                </div>

            </div>
        )
    }

    const filteredAppointments = appointments.filter(appointment => {

        const normalizedSearch = search.toLowerCase().trim()

        const matchesSearch = appointment.doctor.name.toLowerCase().includes(normalizedSearch) ||
            appointment.doctor.specialty
                .toLowerCase()
                .includes(normalizedSearch)

        const matchesStatus = status === "" || appointment.status === status

        return matchesSearch && matchesStatus
    })


    return (
        <div className="space-y-8">

            <PageHeader
                title="Mis turnos"
                subtitle="Consultá tus próximos turnos e historial."
            />

            <AppointmentFilters
                search={search}
                status={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onSearchFocus={handleSearchFocus}
            />

            <div ref={resultsRef} className="space-y-4">

                {filteredAppointments.length === 0 ? (
                    <EmptyState
                        icon={<CalendarSearch className="h-12 w-12" />}
                        title={
                            appointments.length === 0
                                ? "Todavía no tenés turnos"
                                : "No se encontraron turnos"
                        }
                        description={
                            appointments.length === 0
                                ? "Cuando reserves un turno, aparecerá acá."
                                : "Probá modificando la búsqueda o los filtros."
                        }
                    />
                ) : (

                    filteredAppointments.map(appointment => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                        />
                    ))
                )}

            </div>

        </div>
    )
}