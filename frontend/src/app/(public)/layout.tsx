"use client"

import { usePublicRoute } from "@/hooks/usePublicRoute"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { canRender } = usePublicRoute()

    if (!canRender) {
        return null
    }

    return <>{children}</>
}
