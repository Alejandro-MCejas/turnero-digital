export default function AuthContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-10 md:py-4 bg-slate-100">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    )
}