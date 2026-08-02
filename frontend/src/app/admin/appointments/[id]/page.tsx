import AppointmentDetailSection from "@/components/appointments/sections/AppointmentDetailSection";

interface AppointmentDetailPageProps {
    params: Promise<{ id: string }>
}

export default async function AppointmentDetailPage({ params }: AppointmentDetailPageProps) {
    const { id } = await params;

    return <AppointmentDetailSection appointmentId={id} />
}