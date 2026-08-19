import Button from "@/components/ui/buttons/Button";
import { HeartPulse } from "lucide-react";
import Link from "next/link";



export default function LandingNavbar() {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80">
                    <div className="rounded-lg bg-violet-600 p-1.5 sm:p-2">
                        <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>

                    <h1 className="hidden sm:block text-base sm:text-xl font-bold text-slate-800">
                        Turnero Digital
                    </h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Link href="/login">
                        <Button variant="secondary" className="px-3 text-sm sm:px-2.5">Iniciar Sesión</Button>
                    </Link>

                    <Link href="/register">
                        <Button className="px-3 text-sm sm:px-2.5">Registrarse</Button>
                    </Link>
                </div>

            </div>
        </header>
    )
}