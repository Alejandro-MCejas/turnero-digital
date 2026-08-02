import { Stethoscope } from "lucide-react";
import Link from "next/link";



export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:gap-6 px-6 py-8 sm:py-10 text-center md:flex-row">

                <Link
                    href="/"
                    className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                    <div className="rounded-lg bg-violet-600 p-1.5 sm:p-2">
                        <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>

                    <span className="text-lg sm:text-xl font-bold text-slate-800">
                        Turnero Digital
                    </span>
                </Link>

                <p className="text-center text-xs text-slate-500 sm:text-sm">
                    © 2026 Turnero Digital. Todos los derechos reservados.
                </p>

            </div>
        </footer>
    )
}