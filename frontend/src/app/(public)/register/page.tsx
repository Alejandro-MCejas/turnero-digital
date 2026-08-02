"use client"

import AuthContainer from "@/components/auth/AuthContainer"
import AuthLeftSide from "@/components/auth/AuthLeftSide"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { RegisterSchema } from "@/lib/validations/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail, User, IdCard, Calendar, HeartPulse } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

type RegisterFormData = z.infer<typeof RegisterSchema>

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
    })

    const onSubmit = (data: RegisterFormData) => console.log(data)

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
                            <p className="text-xs text-slate-500">Sistema de gestión de turnos</p>
                        </div>
                    </div>
                </div>

                <Card className="w-full max-w-md shadow-xl rounded-2xl p-6 sm:p-8 bg-white/80 backdrop-blur-md border border-white/40">

                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-slate-800">
                            Crear cuenta
                        </h1>
                        <p className="text-sm text-slate-500">
                            Completá tus datos para registrarte
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div>
                            <label className="text-sm text-slate-600">Nombre Completo</label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    {...register("name")}
                                    placeholder="Ej: María Gonzáles"
                                    className="placeholder:text-slate-500 text-slate-800 pl-10"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">Email</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    {...register("email")}
                                    placeholder="Ej: email@gmail.com"
                                    className="placeholder:text-slate-500 text-slate-800 pl-10"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">Contraseña</label>
                            <div className="relative mt-1">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="********"
                                    className="placeholder:text-slate-500 text-slate-800 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">Confirmar Contraseña</label>
                            <div className="relative mt-1">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword")}
                                    placeholder="********"
                                    className="placeholder:text-slate-500 text-slate-800 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">Fecha de nacimiento</label>
                            <div className="relative mt-1">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="date"
                                    min="1900-01-01"
                                    max={new Date().toISOString().split("T")[0]}
                                    className=" text-slate-800 placeholder:text-slate-500 pl-10"
                                    {...register("birthDate")}
                                />

                                {errors.birthDate && (
                                    <p className="text-xs text-red-500">{errors.birthDate.message}</p>
                                )}

                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">DNI</label>
                            <div className="relative mt-1">
                                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    {...register("dni")}
                                    placeholder="123456789"
                                    className="placeholder:text-slate-500 text-slate-800 pl-10"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={!isValid}
                            className="w-full h-11 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-lg"
                        >
                            Registrate
                        </Button>

                        <p className="text-sm text-center text-slate-500">
                            ¿Ya estás registrado?{" "}
                            <Link href="/login">
                                <span className="text-blue-600 hover:underline cursor-pointer">Iniciar sesión</span>
                            </Link>
                        </p>
                    </form>
                </Card>
            </AuthContainer>
        </div>
    )
}