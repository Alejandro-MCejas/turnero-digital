"use client"

import { useSession } from "@/features/auth/hooks/useSession"
import { userRole } from "@/types/enums/userRole"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function usePublicRoute() {
    const router = useRouter()

    const { data: session, isLoading } = useSession()

    useEffect(() => {

        if (isLoading) return

        if (!session) return

        router.replace(
            session.role === userRole.Admin
                ? "/admin/dashboard"
                : "/patient/dashboard"
        )
    }, [session, isLoading, router])

    return {
        isLoading,
        canRender: !isLoading && !session
    }
}