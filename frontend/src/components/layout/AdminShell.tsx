"use client"

import { useState } from "react"
import AdminDrawer from "./AdminDrawer"
import AppLayout from "./AppLayout"
import AdminSidebar from "./AdminSidebar"
import AdminMobileHeader from "./AdminMobileHeader"
import AdminHeader from "./AdminHeader"

interface AdminShellProps {
    children: React.ReactNode
}

export default function AdminShell({ children }: AdminShellProps) {

    const [open, setOpen] = useState(false)

    return (
        <>
            <AdminDrawer open={open} onClose={() => setOpen(false)} />

            <AppLayout
                sidebar={<AdminSidebar />}
                header={
                    <>
                        <div className="lg:hidden">
                            <AdminMobileHeader onOpenMenu={() => setOpen(true)} />
                        </div>

                        <div className="hidden lg:block">
                            <AdminHeader />
                        </div>
                    </>
                }
            >
                {children}
            </AppLayout>

        </>
    )
}