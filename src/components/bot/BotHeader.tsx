import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"


interface HeaderProps {
    heightanimate: boolean
    weidthAnimate: boolean
    handleOpen: (val: boolean) => void
}


const BotHeader = ({ heightanimate, handleOpen, weidthAnimate }: HeaderProps) => {
    return (
        <div className={cn(
            "flex items-center gap-2 border-b pb-2 transition-all duration-500",
            !weidthAnimate && "pb-0 gap-0 border-none"
        )}
        >
            <ChevronLeft onClick={() => handleOpen(false)} className={cn("w-6 h-6 cursor-pointer transition-all duration-1000")} />
            <div onClick={() => handleOpen(true)}
                className={cn(
                    "h-8 w-8 aspect-square rounded-[100%] bg-neutral-500 animate-pulse transition-all duration-1000",
                    !heightanimate && "h-12 w-12 rounded-[20%] cursor-pointer"
                )}
            />
            <p className={cn(!weidthAnimate && "translate-x-10 opacity-0 transition-all duration-1000")}>
                Corinna
            </p>
        </div>
    )
}

export default BotHeader