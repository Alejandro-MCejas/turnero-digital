import { Menu } from "lucide-react"


interface AdminMobileHeaderProps {
    onOpenMenu: () => void
}

export default function AdminMobileHeader({ onOpenMenu }: AdminMobileHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">

            <button
                onClick={onOpenMenu}
                className="rounded-lg p-2 transition hover:bg-slate-100"
            >
                <Menu className="h-6 w-6" />
            </button>

            <div className="w-10" />

        </header>
    )
}