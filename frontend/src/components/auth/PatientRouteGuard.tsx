"use client"

import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import { userRole } from "@/types/enums/userRole"
import Loader from "../ui/feedback/Loader"

interface PatientRouteGuardProps {
    children: React.ReactNode
}

export default function PatientRouteGuard({ children }: PatientRouteGuardProps) {
    const { isLoading, isAuthorized } = useProtectedRoute([userRole.User])

    if (isLoading) {
        return (
            <Loader title="Verificando sesión" description="Comprobando tus permisos..." />
        )
    }

    if (!isAuthorized) {
        return null
    }

    return <>{children}</>
}