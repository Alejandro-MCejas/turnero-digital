import PatientAppointmentDetailSection from "@/components/patient/sections/PatientAppointmentDetailSection"

interface AppointmentDetailPageProps {
    params: Promise<{ id: string }>
}


export default async function AppointmentDetailPage({ params }: AppointmentDetailPageProps) {
    const { id } = await params;

    return <PatientAppointmentDetailSection appointmentId={id} />
}