"use client"

import PatientRouteGuard from "@/components/auth/PatientRouteGuard"
import PatientShell from "@/components/layout/PatientShell"


interface PatientLayoutProps {
    children: React.ReactNode
}

export default function PatientLayout({ children }: PatientLayoutProps) {
    return (
        <PatientRouteGuard>
            <PatientShell>
                {children}
            </PatientShell>
        </PatientRouteGuard>
    )
}