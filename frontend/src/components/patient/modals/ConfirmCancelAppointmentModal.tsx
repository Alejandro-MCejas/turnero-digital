import Button from "@/components/ui/buttons/Button"
import Modal from "@/components/ui/overlay/Modal"
import { CircleAlert } from "lucide-react"


interface ConfirmCancelAppointmentModalProps {
    open: boolean
    onCancel: () => void
    onConfirm: () => void
    isLoading?: boolean
}


export default function ConfirmCancelAppointmentModal({ open, onCancel, onConfirm, isLoading }: ConfirmCancelAppointmentModalProps) {
    return (
        <Modal
            open={open}
            title="Cancelar turno"
            onClose={onCancel}
            size="sm"
        >
            <div className="flex flex-col items-center space-y-5 py-2 text-center">
                <div className="rounded-full bg-amber-100 p-3">
                    <CircleAlert className="h-9 w-9 text-amber-600" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-800">
                        ¿Cancelar este turno?
                    </h3>

                    <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                        El turno quedará marcado como cancelado y dejará de estar disponible para vos.
                    </p>
                </div>

                <div className="flex w-full flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="justify-center sm:w-auto"
                    >
                        Volver
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="justify-center sm:w-auto"
                    >
                        {isLoading ? "Cancelando..." : "Cancelar turno"}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}