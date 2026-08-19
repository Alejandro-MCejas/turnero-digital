"use client"

import { patientMenuItems } from "@/constants/sidebar/patient";
import { HeartPulse, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "../ui/data-display/Avatar";
import Button from "../ui/buttons/Button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { userRoleLabel } from "@/constants/user/userRoleLabel";
import Skeleton from "../ui/feedback/Skeleton";

interface PatientSidebarProps {
    onNavigate?: () => void
}


export default function PatientSidebar({ onNavigate }: PatientSidebarProps) {

    const pathname = usePathname()

    const logoutMutation = useLogout();

    const { data: user, isLoading } = useCurrentUser()

    return (
        <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white">

            <div className="border-b border-slate-200 p-5">

                <div className="flex items-center gap-3">
                    <HeartPulse className="h-7 w-7 text-violet-600" />

                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            Turnero Digital
                        </h1>

                        <p className="text-sm text-slate-500">
                            Panel del paciente
                        </p>
                    </div>
                </div>

            </div>

            <nav className="flex-1 space-y-3 p-4">

                {patientMenuItems.map(item => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={`
                                    flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                    ${isActive
                                    ? "bg-violet-50 text-violet-700 border-l-4 border-violet-600"
                                    : "text-slate-700 hover:bg-slate-100"
                                }
                                    `}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    )
                })}



            </nav>


            <footer className="border-t border-slate-200 p-4">
                <Link
                    href="/patient/profile"
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-100"
                >

                    {isLoading ? (

                        <>
                            <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />

                            <div className="min-w-0 space-y-2">

                                <Skeleton className="h-4 w-24 bg-slate-200" />

                                <Skeleton className="h-3 w-16 bg-slate-200" />

                            </div>
                        </>

                    ) : user ? (

                        <>
                            <Avatar
                                name={user.name}
                                size="md"
                            />

                            <div className="min-w-0">

                                <p className="truncate font-medium text-slate-900">
                                    {user.name}
                                </p>

                                <p className="truncate text-sm text-slate-500">
                                    {userRoleLabel[user.role]}
                                </p>

                            </div>
                        </>

                    ) : null}

                </Link>

                <Button
                    variant="secondary"
                    className="mt-4 w-full"
                    onClick={() => logoutMutation.mutate()}
                >
                    <LogOut className="h-5 w-5" />

                    Cerrar sesión
                </Button>

            </footer>

        </aside>
    )
}