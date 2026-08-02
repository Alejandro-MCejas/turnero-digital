
interface TableProps {
    headers: string[]
    align?: ("left" | "center")[]
    children: React.ReactNode
}

export default function Table({ headers, align = [], children }: TableProps) {
    return (
        <div className="overflow-x-auto rounded-xl">
            <table className="w-full border-collapse">
                <thead className="bg-slate-100">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={header}
                                className={`   
                                    px-3 lg:px-6 py-4 text-xs font-semibold uppercase 
                                    tracking-wide text-slate-500 
                                    ${align[index] === "center" ? "text-center" : "text-left"}
                                `}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="">
                    {children}
                </tbody>
            </table>
        </div>
    )
}