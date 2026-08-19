

interface AppLayoutProps {
    sidebar: React.ReactNode
    header: React.ReactNode
    children: React.ReactNode
}

export default function AppLayout({ sidebar, header, children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen bg-slate-50">

            <aside className="hidden lg:flex w-64 shrink-0 h-screen fixed left-0 top-0 ">
                {sidebar}
            </aside>

            <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:ml-64">

                {header}

                <main className="min-w-0 flex-1 overflow-x-hidden p-6">
                    {children}
                </main>

            </div>

        </div>
    )

}