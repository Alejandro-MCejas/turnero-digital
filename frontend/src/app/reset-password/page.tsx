"use client"

import AuthContainer from "@/components/auth/AuthContainer"
import AuthLeftSide from "@/components/auth/AuthLeftSide"
import Button from "@/components/ui/buttons/Button"
import Card from "@/components/ui/cards/Card"
import Input from "@/components/ui/forms/Input"
import { useResetPassword } from "@/features/auth/hooks/useResetPassword"
import { ResetPasswordSchema } from "@/lib/validations/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, HeartPulse } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>

function ResetPasswordContent() {

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(ResetPasswordSchema),
        mode: "onChange"
    })

    const resetPasswordMutation = useResetPassword()

    const onSubmit = (data: ResetPasswordFormData) => {
        if (!token) return

        resetPasswordMutation.mutate(
            {
                token,
                password: data.password,
                confirmPassword: data.confirmPassword
            },
            {
                onSuccess: () => {
                    setSuccess(true)
                }
            }
        )
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
            <AuthLeftSide />

            <AuthContainer>

                <div className="md:hidden w-full max-w-md mb-6">
                    <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow border border-white/40">

                        <div className="bg-violet-500 p-2 rounded-lg">
                            <HeartPulse className="w-5 h-5 text-slate-100" />
                        </div>

                        <div>
                            <h1 className="text-sm font-semibold text-slate-800">Turnero Digital</h1>

                            <p className="text-xs text-slate-500">
                                Sistema de gestión de turnos
                            </p>
                        </div>

                    </div>
                </div>

                <Card className="w-full rounded-2xl p-6 sm:p-8 bg-white/80 backdrop-blur-md border border-white/40 shadow-lg">

                    {!token ? (

                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-slate-800">
                                    Restablecer contraseña
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    El enlace para restablecer la contraseña no es válido.
                                </p>
                            </div>

                            <Link
                                href="/forgot-password"
                                className="block text-center text-sm text-indigo-600 hover:underline"
                            >
                                Solicitar un nuevo enlace
                            </Link>
                        </div>

                    ) : success ? (

                        <div className="text-center">

                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-slate-800">
                                    ¡Contraseña restablecida!
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Tu contraseña se actualizó correctamente.
                                    Ya podés iniciar sesión con tu nueva contraseña.
                                </p>
                            </div>

                            <Link href="/login">
                                <Button
                                    type="button"
                                    className="w-full h-11 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-lg"
                                >
                                    Iniciar sesión
                                </Button>
                            </Link>

                        </div>

                    ) : (

                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-slate-800">
                                    Restablecer contraseña
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Ingresá tu nueva contraseña para recuperar el acceso a tu cuenta.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                            >

                                <div className="flex flex-col gap-1">

                                    <label className="text-sm text-slate-600">
                                        Nueva contraseña
                                    </label>

                                    <div className="relative">

                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            {...register("password")}
                                            placeholder="********"
                                            className="pr-10 text-slate-800 w-full"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        >
                                            {showPassword
                                                ? <EyeOff size={18} />
                                                : <Eye size={18} />
                                            }
                                        </button>

                                    </div>

                                    {errors.password && (
                                        <p className="text-xs text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}

                                </div>

                                <div className="flex flex-col gap-1">

                                    <label className="text-sm text-slate-600">
                                        Confirmar contraseña
                                    </label>

                                    <div className="relative">

                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register("confirmPassword")}
                                            placeholder="********"
                                            className="pr-10 text-slate-800 w-full"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        >
                                            {showConfirmPassword
                                                ? <EyeOff size={18} />
                                                : <Eye size={18} />
                                            }
                                        </button>

                                    </div>

                                    {errors.confirmPassword && (
                                        <p className="text-xs text-red-500">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}

                                </div>

                                {resetPasswordMutation.isError && (
                                    <p className="text-xs text-red-500">
                                        El enlace para restablecer la contraseña es inválido o expiró.
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={
                                        !isValid ||
                                        resetPasswordMutation.isPending
                                    }
                                    className="w-full h-11 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-lg"
                                >
                                    {resetPasswordMutation.isPending
                                        ? "Restableciendo..."
                                        : "Restablecer contraseña"
                                    }
                                </Button>

                                <p className="text-sm text-center">
                                    <Link
                                        href="/login"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        Volver a iniciar sesión
                                    </Link>
                                </p>

                            </form>
                        </>

                    )}

                </Card>
            </AuthContainer>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordContent />
        </Suspense>
    )
}