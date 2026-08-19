"use client"

import { useState } from "react"
import Button from "@/components/ui/buttons/Button"
import { Eye, EyeOff } from "lucide-react"
import Modal from "@/components/ui/overlay/Modal"
import Input from "@/components/ui/forms/Input"
import { useChangePassword } from "@/features/auth/hooks/useChangePassword"
import { ChangePasswordSchema } from "@/lib/validations/authSchema"

interface Props {
    open: boolean
    onClose: () => void
}

export default function ChangePasswordModal({ open, onClose }: Props) {

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [touched, setTouched] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    })

    const { mutate: changePassword, isPending: isChanging } = useChangePassword()

    const validation = ChangePasswordSchema.safeParse(form)

    const errors = validation.success ? {} : validation.error.flatten().fieldErrors

    const isValid = validation.success

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }))

        setTouched(prev => ({
            ...prev,
            [field]: true
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!isValid || isChanging) return

        changePassword(form, {
            onSuccess: () => {
                setForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                })

                setTouched({
                    currentPassword: false,
                    newPassword: false,
                    confirmPassword: false
                })

                setShowCurrent(false)
                setShowNew(false)
                setShowConfirm(false)

                onClose()
            }
        })
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Cambiar contraseña"
            subtitle="Ingresá tu contraseña actual y la nueva"
            size="sm"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-600">Contraseña actual</label>

                    <div className="relative">
                        <Input
                            type={showCurrent ? "text" : "password"}
                            value={form.currentPassword}
                            disabled={isChanging}
                            onChange={(e) => handleChange("currentPassword", e.target.value)}
                        />

                        <button
                            type="button"
                            disabled={isChanging}
                            onClick={() => setShowCurrent(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {touched.currentPassword && errors.currentPassword?.[0] && (
                        <p className="text-xs text-red-500">
                            {errors.currentPassword[0]}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-600">Nueva contraseña</label>

                    <div className="relative">
                        <Input
                            type={showNew ? "text" : "password"}
                            value={form.newPassword}
                            disabled={isChanging}
                            onChange={(e) => handleChange("newPassword", e.target.value)}
                        />

                        <button
                            type="button"
                            disabled={isChanging}
                            onClick={() => setShowNew(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {touched.newPassword && errors.newPassword?.[0] && (
                        <p className="text-xs text-red-500">
                            {errors.newPassword[0]}
                        </p>
                    )}

                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-slate-600">Confirmar contraseña</label>

                    <div className="relative">
                        <Input
                            type={showConfirm ? "text" : "password"}
                            value={form.confirmPassword}
                            disabled={isChanging}
                            onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        />

                        <button
                            type="button"
                            disabled={isChanging}
                            onClick={() => setShowConfirm(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {touched.confirmPassword && errors.confirmPassword?.[0] && (
                        <p className="text-xs text-red-500">
                            {errors.confirmPassword[0]}
                        </p>
                    )}

                </div>


                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={isChanging}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={!isValid || isChanging}
                        className="bg-linear-to-r from-indigo-500 to-violet-500 text-white"
                    >
                        {isChanging ? "Guardando..." : "Guardar cambios"}
                    </Button>
                </div>

            </form>
        </Modal>
    )
}