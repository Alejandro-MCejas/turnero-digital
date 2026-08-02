import { userTypes } from "@/constants/landing/userTypes";
import UserTypeCard from "../cards/UserTypeCard";



export default function WhoCanUseSection() {
    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        ¿Quién puede usar Turnero Digital?
                    </h2>

                    <p className="mt-5 text-base text-slate-600 sm:text-lg">
                        La plataforma fue diseñada tanto para pacientes que
                        necesitan reservar una consulta como para centros médicos
                        que administran la atención diaria.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {userTypes.map(userType => {
                        const Icon = userType.icon

                        return (
                            <UserTypeCard
                                key={userType.title}
                                icon={<Icon className="h-8 w-8" />}
                                title={userType.title}
                                description={userType.description}
                                items={userType.items}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}