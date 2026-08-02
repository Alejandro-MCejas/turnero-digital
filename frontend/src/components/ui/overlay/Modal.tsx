import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { X } from "lucide-react";


interface ModalProps {
    open: boolean;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    onClose: () => void;
    size?: "sm" | "md" | "lg"
}

const modalSizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
}


export default function Modal({ open, title, subtitle, children, onClose, size = "md" }: ModalProps) {
    useLockBodyScroll(open)

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm">
            <div className={`w-full max-h-[95vh] overflow-y-auto rounded-2xl bg-white shadow-2xl ${modalSizes[size]}`}>
                <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                        {subtitle && (
                            <p className="mt-1 text-sm text-slate-500">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-full p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 active:scale-95"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-5 sm:p-6">{children}</div>
            </div>
        </div>
    )
}