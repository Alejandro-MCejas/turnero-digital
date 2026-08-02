import { features } from "@/constants/landing/features";
import FeatureCard from "../cards/FeatureCard";



export default function FeaturesSection() {
    return (
        <section
            id="features"
            className="bg-white py-16 lg:py-24"
        >
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        ¿Qué podés hacer con Turnero Digital?
                    </h2>

                    <p className="mt-5 text-base text-slate-600 sm:text-lg">
                        Una plataforma pensada para facilitar la gestión
                        de turnos médicos tanto para pacientes como para
                        centros de salud.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {features.map(feature => {
                        const Icon = feature.icon;

                        return (
                            <FeatureCard
                                key={feature.title}
                                icon={<Icon className="h-7 w-7" />}
                                title={feature.title}
                                description={feature.description}
                            />
                        )
                    })}
                </div>

            </div>
        </section>
    )
}