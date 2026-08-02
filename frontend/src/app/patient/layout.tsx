import PatientShell from "@/components/layout/PatientShell"


interface PatientLayoutProps {
    children: React.ReactNode
}

export default function PatientLayout({ children }: PatientLayoutProps) {
    return (
        <PatientShell>{children}</PatientShell>
    )

}