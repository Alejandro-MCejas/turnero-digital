import Button from "@/components/ui/buttons/Button";
import ChangePasswordModal from "./ChangePasswordModal";
import { useState } from "react";



export default function SecurityCard() {

    const [open, setOpen] = useState(false)

    return (

        <>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">

                <h2 className="text-2xl font-bold text-slate-900">
                    Seguridad
                </h2>

                <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="font-medium text-slate-800">
                            Contraseña
                        </p>

                        <p className="text-slate-500">
                            ••••••••••••
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Por motivos de seguridad la contraseña nunca se muestra.
                        </p>

                    </div>

                    <Button
                        variant="secondary"
                        onClick={() => setOpen(true)}
                        className="justify-center sm:w-auto"

                    >
                        Cambiar contraseña
                    </Button>

                </div>

            </section >

            <ChangePasswordModal
                open={open}
                onClose={() => setOpen(false)}
            />

        </>

    )
}