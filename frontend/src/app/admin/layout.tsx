"use client"

import AdminRouteGuard from "@/components/auth/AdminRouteGuard";
import AdminShell from "@/components/layout/AdminShell";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminRouteGuard>
            <AdminShell>
                {children}
            </AdminShell>
        </AdminRouteGuard>
    )
}