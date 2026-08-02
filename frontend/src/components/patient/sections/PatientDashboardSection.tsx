import PageHeader from "@/components/shared/headers/PageHeader";
import { appointments } from "@/mocks/patientAppointments";
import AppointmentCard from "../cards/AppointmentCard";
import QuickActionCard from "../cards/QuickActionCard";
import NextAppointmentCard from "../cards/NextAppointmentCard";
import { CalendarDays, CalendarPlus } from "lucide-react";


export default function PatientDashboardSection() {

    const nextAppointment = appointments[0];
    return (
        <div className="space-y-8">

            <PageHeader
                title="Inicio"
                subtitle="Consultá tu próximo turno y accedé rápidamente a las funciones principales."
            />

            <NextAppointmentCard
                appointment={nextAppointment}
            />

            <div className="grid gap-6 md:grid-cols-2">

                <QuickActionCard
                    title="Solicitar turno"
                    description="Reservá un nuevo turno con un profesional."
                    href="/patient/book-appointment"
                    icon={CalendarPlus}
                />

                <QuickActionCard
                    title="Mis turnos"
                    description="Consultá tus próximos turnos e historial."
                    href="/patient/appointments"
                    icon={CalendarDays}
                />

            </div>

            <section className="space-y-4">

                <h2 className="text-xl font-bold text-slate-900">
                    Próximos turnos
                </h2>

                {appointments.map(appointment => (
                    <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                    />
                ))}

            </section>

        </div>
    )
}