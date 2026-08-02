import Button from "@/components/ui/buttons/Button";
import { CalendarOff } from "lucide-react";
import Link from "next/link";


export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

            <div className="flex max-w-lg flex-col items-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
                    <CalendarOff className="h-10 w-10 text-violet-600" />
                </div>

                <span className="text-sm font-semibold uppercase tracking-widest text-violet-600">
                    Error 404
                </span>

                <h1 className="mt-3 text-4xl font-bold text-slate-900">
                    Página no encontrada
                </h1>

                <p className="mt-4 text-slate-500">
                    La página que estás buscando no existe, fue eliminada
                    o la dirección ingresada es incorrecta.
                </p>

                <Link href="/" className="mt-8">
                    <Button>
                        Volver al inicio
                    </Button>
                </Link>

            </div>

        </main>
    )
}