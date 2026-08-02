"use client"

import PageHeader from "@/components/shared/headers/PageHeader";
import AppointmentCard from "../cards/AppointmentCard";
import { appointments } from "@/mocks/patientAppointments"
import AppointmentFilters from "../ui/AppointmentFilters";
import { useRef, useState } from "react";
import EmptyState from "@/components/shared/empty-state/EmptyState";
import { CalendarSearch } from "lucide-react";



export default function PatientAppointmentsSection() {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const resultsRef = useRef<HTMLDivElement>(null);

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

    const filteredAppointments = appointments.filter(appointment => {

        const matchesSearch =
            appointment.doctor.toLowerCase().includes(search.toLowerCase()) ||
            appointment.specialty.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            status === "" || appointment.status === status;

        return matchesSearch && matchesStatus;
    });


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
                        title="No se encontraron turnos"
                        description="Probá modificando la búsqueda o los filtros"
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