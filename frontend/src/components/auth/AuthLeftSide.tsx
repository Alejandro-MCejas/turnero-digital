import { HeartPulse } from "lucide-react";

export default function AuthLeftSide() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-slate-900 to-slate-800 text-white flex-col justify-between p-10">

      <div>
        <h1 className="text-2xl font-bold mb-2">Turnero digital</h1>
        <p className="text-slate-400 text-sm">Sistema de gestión de turnos</p>
      </div>

      <div className="flex justify-center items-center flex-1">
        <div className="bg-slate-800/60 backdrop-blur-md p-12 rounded-3xl shadow-inner border border-white/10">
          <HeartPulse className="w-20 h-20 text-violet-400" />
        </div>
      </div>

      <p className="text-xs text-slate-500">© 2026 Turnero Digital</p>

    </div>
  )
}