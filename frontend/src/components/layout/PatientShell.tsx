"use client"

import { useState } from "react";
import PatientDrawer from "./PatientDrawer";
import AppLayout from "./AppLayout";
import PatientSidebar from "./PatientSidebar";
import PatientMobileHeader from "./PatientMobileHeader";
import PatientHeader from "./PatientHeader";



interface PatientShellProps {
    children: React.ReactNode
}

export default function PatientShell({ children }: PatientShellProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <PatientDrawer
                open={open}
                onClose={() => setOpen(false)}
            />

            <AppLayout
                sidebar={<PatientSidebar />}
                header={
                    <>
                        <div className="lg:hidden">
                            <PatientMobileHeader
                                onOpenMenu={() => setOpen(true)}
                            />
                        </div>

                        <div className="hidden lg:block">
                            <PatientHeader />
                        </div>
                    </>
                }
            >
                {children}
            </AppLayout>
        </>
    );

}