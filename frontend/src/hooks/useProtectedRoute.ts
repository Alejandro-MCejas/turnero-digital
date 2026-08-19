"use client"


import { useSession } from "@/features/auth/hooks/useSession";
import { userRole, UserRole } from "@/types/enums/userRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function useProtectedRoute(allowedRoles: UserRole[]) {
    const router = useRouter()

    const { data: session, isLoading, isError } = useSession()

    useEffect(() => {
        if (isLoading) return;

        if (isError || !session) {
            router.replace("/login")
            return
        }

        if (!allowedRoles.includes(session.role)) {
            router.replace(
                session.role === userRole.Admin ? "/admin/dashboard" : "/patient/dashboard"
            )
        }
    }, [session, isLoading, isError, allowedRoles, router])



    return {
        user: session,
        isLoading,
        isAuthorized: !!session && allowedRoles.includes(session.role),
    }
}