

interface FormActionsProps {
    children: React.ReactNode
}

export default function FormActions({ children }: FormActionsProps) {
    return (
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end ">
            {children}
        </div>
    )
}