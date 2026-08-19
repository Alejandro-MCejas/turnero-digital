"use client"

import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import { userRole } from "@/types/enums/userRole"
import Loader from "../ui/feedback/Loader"

interface AdminRouteGuardProps {
    children: React.ReactNode
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
    const { isLoading, isAuthorized } = useProtectedRoute([userRole.Admin])

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