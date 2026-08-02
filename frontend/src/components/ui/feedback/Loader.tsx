import Spinner from "./Spinner"


interface LoaderProps {
    title?: string
    description?: string
}

export default function Loader({ title = "Cargando...", description = "Por favor esperá un momento." }: LoaderProps) {
    return (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 rounded-2xl border border-slate-200 bg-white px-8 py-12">
           
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50">
                <Spinner size="lg" />
            </div>

            <div className="text-center">
                <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
            </div>
        </div>
    )
}