"use client"

import Loader from "@/components/ui/feedback/Loader"
import { usePublicRoute } from "@/hooks/usePublicRoute"

export default function PublicLayout({ children }: { children: React.ReactNode }) {

    const { isLoading, canRender } = usePublicRoute()

    if (isLoading) {
        return (
            <Loader title="Verificando sesión" description="Comprobando tus credenciales..." />
        )
    }

    if (!canRender) {
        return null
    }

    return <>{children}</>
}
