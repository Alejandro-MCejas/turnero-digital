import Avatar from "@/components/ui/data-display/Avatar";
import { Profile } from "@/types/models/profile";

interface ProfileInfoCardProps {
    user: Profile
}

export default function ProfileInfoCard({ user }: ProfileInfoCardProps) {

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">

            <div className="flex items-center gap-4 sm:gap-6">

                <div className="shrink-0">
                    <Avatar
                        name={`${user.firstName} ${user.lastName}`}
                        size="lg"
                    />
                </div>

                <div className="min-w-0">
                    <h1 className="break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                        {user.firstName} {user.lastName}
                    </h1>

                    <p className="mt-1 text-slate-500">
                        {user.role}
                    </p>
                </div>

            </div>

        </section>
    );
}