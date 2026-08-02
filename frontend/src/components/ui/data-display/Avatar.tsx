
interface AvatarProps {
    name: string
    size?: "sm" | "md" | "lg"
}




export default function Avatar({ name, size = "md" }: AvatarProps) {

    const initials = name
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("");

    const sizes = {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "h-20 w-20 text-2xl sm:text-3xl",
    }
    return (
        <div className={`shrink-0 flex items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-600 ${sizes[size]}`}>{initials}</div>
    )
}