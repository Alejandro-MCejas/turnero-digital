import { Bell } from "lucide-react";
import IconButton from "../ui/buttons/IconButton";



export default function PatientHeader() {
    return (
        <header className="flex h-16 items-center justify-end border-b border-slate-200 bg-white px-6">

            <div className="flex items-center gap-5">
                <IconButton>
                    <Bell className="h-6 w-6" />
                </IconButton>
            </div>

        </header>
    )
}