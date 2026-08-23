"use client";

import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import AdminSidebar from "./AdminSidebar";


interface AdminDrawerProps {
    open: boolean
    onClose: () => void
}

export default function AdminDrawer({ open, onClose }: AdminDrawerProps) {
    useLockBodyScroll(open)

    return (
        <>
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed left-0 top-0 z-50 h-dvh w-64
                    transition-transform duration-300
                    lg:hidden
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <AdminSidebar onNavigate={onClose} />
            </aside>
        </>
    );
}