import PageHeader from "@/components/shared/headers/PageHeader";
import AppointmentBookingForm from "../forms/AppointmentBookingForm";


export default function PatientBookAppointmentSection() {
    return (
        <div className="space-y-8">

            <PageHeader
                title="Solicitar turno"
                subtitle="Elegí un profesional y reservá un turno."
            />

            <AppointmentBookingForm />

        </div>
    );
}