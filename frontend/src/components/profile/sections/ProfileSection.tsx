"use client"

import { Profile } from "@/types/models/profile";
import PersonalInformationCard from "../cards/PersonalInformationCard";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import SecurityCard from "../cards/SecurityCard";
import PageHeader from "@/components/shared/headers/PageHeader";
import { useState } from "react";

export default function ProfileSection() {

    // Después vendrá de la API

    const [user, setUser] = useState<Profile>({
        firstName: "Alejandro",
        lastName: "Cejas",
        email: "alejandro@email.com",
        phone: "3511234567",
        address: "Córdoba, Argentina",
        role: "Paciente",
    })

    const [originalUser, setOriginalUser] = useState<Profile>(user);

    const [isEditing, setIsEditing] = useState(false);

    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">

            <PageHeader
                title="Mi Perfil"
                subtitle="Consultá y administrá la información de tu cuenta"
            />

            <ProfileInfoCard user={user} />

            <PersonalInformationCard
                user={user}
                setUser={setUser}
                originalUser={originalUser}
                setOriginalUser={setOriginalUser}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />

            <SecurityCard />

        </main>
    );
}