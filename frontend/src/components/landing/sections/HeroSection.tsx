"use client"

import Button from "@/components/ui/buttons/Button";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function HeroSection() {
    return (
        <section className="bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:gap-14 px-6 py-14 lg:py-24 lg:flex-row">
                <div className="flex-1 text-center lg:text-left">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                        <CalendarDays className="h-4 w-4" />
                        Gestión moderna de turnos médicos
                    </div>

                    <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                        Gestioná y solicitá turnos médicos desde{" "}
                        <span className="text-violet-600">un solo lugar.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 lg:mx-0">
                        Turnero Digital permite solicitar turnos online y administrar
                        centros médicos desde una única plataforma, ofreciendo una
                        experiencia rápida, organizada y accesible para todos.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4 sm:flex-nowrap lg:justify-start">
                        <Link href="/register">
                            <Button className="px-5 sm:px-8 bg-violet-800 hover:bg-violet-900">Solicitar turno</Button>
                        </Link>

                        <Button
                            variant="secondary"
                            className="px-5 sm:px-8"
                            onClick={() =>
                                document.getElementById("features")?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                })
                            }
                        >
                            Conocer más
                        </Button>
                    </div>


                    <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-600 lg:justify-start">
                        <span>✔ Reservas online</span>
                        <span>✔ Gestión centralizada</span>
                        <span>✔ Disponible 24/7</span>
                    </div>
                </div>

                <div className="flex flex-1 justify-center">
                    <Image
                        src="/images/landing/hero-illustration.png"
                        alt="Ilustración de Turnero Digital mostrando la experiencia de pacientes y centros médicos."
                        width={900}
                        height={700} 
                        priority
                        className="h-auto w-full max-w-md lg:max-w-2xl"
                    />
                </div>

            </div>

        </section>
    )
}