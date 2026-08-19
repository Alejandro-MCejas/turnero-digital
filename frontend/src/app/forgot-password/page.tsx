"use client"

import AuthContainer from "@/components/auth/AuthContainer";
import AuthLeftSide from "@/components/auth/AuthLeftSide";
import Button from "@/components/ui/buttons/Button";
import Card from "@/components/ui/cards/Card";
import Input from "@/components/ui/forms/Input";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { ForgotPasswordSchema } from "@/lib/validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartPulse } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


type ForgoPasswordFormData = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false)

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgoPasswordFormData>({
        resolver: zodResolver(ForgotPasswordSchema),
        mode: "onChange"
    })

    const forgotPasswordMutation = useForgotPassword()

    const onSubmit = (data: ForgoPasswordFormData) => {
        forgotPasswordMutation.mutate(data, {
            onSuccess: () => {
                setSubmitted(true)
            }
        })
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
                                Sistema de gestión de turnos
                            </p>
                        </div>

                    </div>
                </div>

                <Card className="w-full rounded-2xl p-6 sm:p-8 bg-white/80 backdrop-blur-md border border-white/40 shadow-lg">

                    {!submitted ? (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-slate-800">
                                    Recuperar contraseña
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Ingresá tu email y te enviaremos un enlace para restablecer tu contraseña.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                                <div className="flex flex-col gap-1">

                                    <label className="text-sm text-slate-600">Email</label>

                                    <Input
                                        type="email"
                                        {...register("email")}
                                        placeholder="email@gmail.com"
                                        className="text-slate-800 placeholder:text-slate-400 w-full"
                                    />

                                    {errors.email && (
                                        <p className="text-xs text-red-500">{errors.email.message}</p>
                                    )}

                                </div>

                                <Button
                                    type="submit"
                                    disabled={!isValid || forgotPasswordMutation.isPending}
                                    className="w-full h-11 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-lg"
                                >
                                    {forgotPasswordMutation.isPending
                                        ? "Enviando..."
                                        : "Enviar enlace"
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

                    ) : (

                        <div className="text-center">

                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-slate-800">
                                    Revisá tu correo
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Si existe una cuenta asociada a ese email,
                                    recibirás un enlace para restablecer tu contraseña.
                                </p>
                            </div>

                            <p className="mb-6 text-sm text-slate-500">
                                Revisá también la carpeta de spam o correo no deseado.
                            </p>

                            <Link href="/login">
                                <Button
                                    type="button"
                                    className="w-full h-11 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-lg"
                                >
                                    Volver a iniciar sesión
                                </Button>
                            </Link>

                        </div>

                    )}

                </Card>
            </AuthContainer>

        </div>
    )
}