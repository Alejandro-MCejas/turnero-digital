

interface TimeSlotButtonProps {
    time: string;
    selected?: boolean;
    disabled?: boolean
    onClick?: () => void
}

export default function TimeSlotButton({ time, selected = false, disabled = false, onClick }: TimeSlotButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`
                rounded-lg border px-2 py-2 text-sm sm:px-4 font-medium transition-colors cursor-pointer
                ${selected
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-slate-300 bg-white hover:border-violet-500 hover:text-violet-600"
                }
                ${disabled
                    ? "cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200 hover:border-slate-200 hover:text-slate-400"
                    : ""
                }
            `}
        >
            {time}
        </button>
    )
}