"use client"

import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import PersonalInformationCard from "../cards/PersonalInformationCard";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import SecurityCard from "../cards/SecurityCard";
import PageHeader from "@/components/shared/headers/PageHeader";
import Loader from "@/components/ui/feedback/Loader";

export default function ProfileSection() {

    const { data: user, isLoading, isError } = useCurrentUser()

    if (isLoading) {
        return (
            <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
                <PageHeader
                    title="Mi Perfil"
                    subtitle="Consultá y administrá la información de tu cuenta"
                />

                <Loader
                    title="Cargando perfil"
                    description="Obteniendo la información de tu cuenta"
                />
            </main>
        )
    }

    if (isError || !user) {
        return (
            <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
                <PageHeader
                    title="Mi Perfil"
                    subtitle="Consultá y administrá la información de tu cuenta"
                />

                <div className="py-12 text-center text-slate-500">
                    No se pudo cargar la información del perfil.
                </div>
            </main>
        )
    }

    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">

            <PageHeader
                title="Mi Perfil"
                subtitle="Consultá y administrá la información de tu cuenta"
            />

            <ProfileInfoCard user={user} />

            <PersonalInformationCard user={user} />

            <SecurityCard />

        </main>
    );
}