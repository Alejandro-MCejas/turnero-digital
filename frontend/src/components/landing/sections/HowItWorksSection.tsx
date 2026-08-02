import { steps } from "@/constants/landing/steps";
import StepCard from "../cards/StepCard";


export default function HowItWorksSection() {
    return (
        <section className="bg-slate-50 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        ¿Cómo solicitar un turno?
                    </h2>

                    <p className="mt-5 text-base text-slate-600 sm:text-lg">
                        En pocos pasos podés reservar una consulta con el profesional que necesites.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <StepCard
                                key={step.title}
                                number={index + 1}
                                icon={<Icon className="h-8 w-8" />}
                                title={step.title}
                                description={step.description}
                            />
                        );
                    })}

                </div>
            </div>
        </section>
    )
}