"use client"

import AuthContainer from "@/components/auth/AuthContainer"
import AuthLeftSide from "@/components/auth/AuthLeftSide"
import Button from "@/components/ui/buttons/Button"
import Card from "@/components/ui/cards/Card"
import Input from "@/components/ui/forms/Input"
import { useLogin } from "@/features/auth/hooks/useLogin"
import { LoginSchema } from "@/lib/validations/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, HeartPulse } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type LoginFormData = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors, isValid } } =
    useForm<LoginFormData>({
      resolver: zodResolver(LoginSchema),
      mode: "onChange"
    })

  const loginMutation = useLogin()

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
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
              <h1 className="text-sm font-semibold text-slate-800">
                Turnero Digital
              </h1>
              <p className="text-xs text-slate-500">
                Sistema de gestión de turnos
              </p>
            </div>
          </div>
        </div>

        <Card className="w-full rounded-2xl p-6 sm:p-8 bg-white/80 backdrop-blur-md border border-white/40 shadow-lg">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">Iniciar sesión</h2>
            <p className="text-sm text-slate-500">Accedé a tu cuenta</p>
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
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600">Contraseña</label>

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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}

              {loginMutation.isError && (
                <p className="text-xs text-red-500">
                  Email o contraseña incorrectos
                </p>
              )}
            </div>

            <div className=" text-sm">
              <Link href="/forgot-password" className="text-indigo-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              className="w-full h-11 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-lg"
            >
              Iniciar sesión
            </Button>

            <p className="text-sm text-center text-slate-500">
              ¿No tenés cuenta?{" "}

              <Link href="/register">
                <span className="text-indigo-600 cursor-pointer hover:underline">
                  Registrate
                </span>
              </Link>
            </p>

          </form>
        </Card>
      </AuthContainer>
    </div>
  )
}