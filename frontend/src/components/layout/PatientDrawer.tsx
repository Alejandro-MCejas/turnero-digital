import useLockBodyScroll from "@/hooks/useLockBodyScroll"
import PatientSidebar from "./PatientSidebar"

interface PatientDrawerProps {
    open: boolean
    onClose: () => void
}

export default function PatientDrawer({ open, onClose }: PatientDrawerProps) {

    useLockBodyScroll(open)

    return (
        <>
            {open && (
                <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
            )}

            <aside className={`fixed left-0 top-0 z-50 h-screen w-64 bg-white transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <PatientSidebar onNavigate={onClose}/>
            </aside>

        </>
    )
}