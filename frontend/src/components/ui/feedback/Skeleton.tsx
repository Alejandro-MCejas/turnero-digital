

interface SpinnerProps {
    className?: string
}

export default function Skeleton({ className = "" }: SpinnerProps) {
    return (
        <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
    )
}