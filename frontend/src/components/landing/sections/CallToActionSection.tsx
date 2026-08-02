import Button from "@/components/ui/buttons/Button";
import Link from "next/link";



export default function CallToActionSection() {
    return (
        <section className="bg-violet-600 py-16 lg:py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">

                <h2 className="text-3xl font-bold text-white sm:text-4xl">¿Listo para comenzar?</h2>

                <p className="mt-6 max-w-2xl text-base leading-7 text-violet-100 sm:text-lg sm:leading-8">
                    Unite a Turnero Digital para solicitar turnos médicos de forma
                    sencilla o administrar tu centro médico desde un único lugar.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4 lg:mt-10">
                    <Link href="/register">
                        <Button className="w-32 justify-center">Registrarse</Button>
                    </Link>

                    <Link href="/login">
                        <Button variant="secondary" className="w-32 justify-center">Iniciar sesión</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}