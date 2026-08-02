"use client"

import { HeartPulse, LogOut } from "lucide-react";
import Link from "next/link";
import Button from "../ui/buttons/Button";
import { usePathname } from "next/navigation";
import Avatar from "../ui/data-display/Avatar";
import { adminMenuItems } from "@/constants/sidebar/admin";

interface AdminSidebarProps {
    onNavigate?: () => void
}


export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {

    const pathName = usePathname()

    return (
        <aside className="flex h-full w-full flex-col bg-slate-900 text-white shadow-xl">
            <div className="border-b border-slate-800 p-5">
                <div className="flex items-center gap-3">
                    <HeartPulse className="h-7 w-7" />

                    <div>
                        <h1 className="text-xl font-bold">Turnero Digital</h1>
                        <p className="text-sm text-slate-400">Panel Administrativo</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-6 p-4">
                {adminMenuItems.map(section => (
                    <div key={section.title} className="space-y-2">

                        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {section.title}
                        </p>

                        {section.items.map(item => {

                            const Icon = item.icon;
                            const isActive = pathName === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onNavigate}
                                    className={`
                                    flex items-center gap-3 rounded-lg px-3 py-2 transition-colors
                                        ${isActive
                                            ? "border-l-4 border-blue-500 bg-slate-800 text-white"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />

                                    {item.label}
                                </Link>
                            );
                        })}

                    </div>
                ))}
            </nav>

            <footer className="border-t border-slate-800 p-4">

                <Link
                    href="/admin/profile"
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-800"
                >
                    <Avatar name="Alejandro Cejas" size="md" />

                    <div className="min-w-0">
                        <p className="truncate font-medium">Alejandro</p>
                        <p className="truncate text-sm text-slate-400">Administrador</p>
                    </div>
                </Link>

                <Button
                    variant="secondary"
                    className="mt-4 w-full"
                >
                    <LogOut className="h-5 w-5" />
                    Cerrar sesión
                </Button>

            </footer>
        </aside>

    )
}