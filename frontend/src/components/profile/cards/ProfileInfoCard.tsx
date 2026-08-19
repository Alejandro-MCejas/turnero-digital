import Avatar from "@/components/ui/data-display/Avatar";
import { userRoleLabel } from "@/constants/user/userRoleLabel";
import { User } from "@/types/models/user";

interface ProfileInfoCardProps {
    user: User
}

export default function ProfileInfoCard({ user }: ProfileInfoCardProps) {

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">

            <div className="flex items-center gap-4 sm:gap-6">

                <div className="shrink-0">
                    <Avatar
                        name={user.name}
                        size="lg"
                    />
                </div>

                <div className="min-w-0">
                    <h1 className="break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                        {user.name}
                    </h1>

                    <p className="mt-1 text-slate-500">
                        {userRoleLabel[user.role]}
                    </p>
                </div>

            </div>

        </section>
    );
}