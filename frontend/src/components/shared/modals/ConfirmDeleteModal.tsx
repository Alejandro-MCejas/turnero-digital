import { TriangleAlert } from "lucide-react"
import Button from "../../ui/buttons/Button"
import Modal from "../../ui/overlay/Modal"


interface ConfirmDeleteModalProps {
    open: boolean
    title?: string
    heading?: string
    confirmText?: string
    message: string
    entity: string
    loading?: boolean
    onCancel: () => void
    onConfirm: () => void
}

export default function ConfirmDeleteModal({
    open,
    title = "Confirmar eliminación",
    heading,
    confirmText = "Eliminar",
    message,
    entity,
    loading = false,
    onCancel,
    onConfirm
}: ConfirmDeleteModalProps) {
    return (
        <Modal
            open={open}
            title={title}
            onClose={onCancel}
            size="sm"
        >
            <div className="flex flex-col items-center text-center space-y-4 py-2">
                <div className="rounded-full bg-red-100 p-3">
                    <TriangleAlert className="h-9 w-9 text-red-600" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-800">{heading ?? `¿Eliminar ${entity}`}?</h3>
                    <p className="max-w-xs whitespace-pre-line text-sm text-slate-500 leading-relaxed">{message}</p>
                </div>


                <div className="mt-2 flex w-full flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="justify-center sm:w-auto"
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="danger"
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="justify-center sm:w-auto"
                    >
                        {loading ? "Eliminando..." : confirmText}
                    </Button>
                </div>
            </div>
        </Modal>


    )
}