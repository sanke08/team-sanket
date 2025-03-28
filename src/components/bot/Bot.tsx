"use client"
import { cn } from "@/lib/utils"
import { lazy, Suspense, useState } from "react"

const BotHeader = lazy(() => import("./BotHeader"))
const BotMain = lazy(() => import("./BotMain"))


const Bot = () => {
    const [heightanimate, setHeightAnimate] = useState(false)
    const [weidthAnimate, setWeidthAnimate] = useState(false)



    const handleToggle = (val: boolean) => {
        if (val) {
            setWeidthAnimate(true)
            setTimeout(() => {
                setHeightAnimate(true)
            }, 500)
        } else {
            setHeightAnimate(false)
            setTimeout(() => {
                setWeidthAnimate(false)
            }, 500)
        }
    }

    return (
        <div
            className={cn(
                "fixed w-full h-full z-[10] transition-all duration-500 bottom-0 right-0",
                heightanimate && "bg-neutral-800/50 backdrop-blur-[4px]",
                (!heightanimate && !weidthAnimate) && "w-fit h-fit"
            )}
        >
            <div className="fixed md:bottom-4 md:right-4 bottom-5 right-5 flex flex-col items-end justify-end w-full ">
                <p className={cn(
                    "px-2 py-0 w-max -translate-x-10 text-white rounded-lg primary-gradient transition-all duration-1000",
                    weidthAnimate && "translate-y-10"
                )}
                >
                    Need help
                </p>
                <div className={cn(
                    " h-[34rem] sm:w-96 w-[20rem] rounded-xl z-50 p-4 bg-white overflow-hidden transition-all duration-500 border-2",
                    !heightanimate && "h-14 gap-0 py-[3px]",
                    !weidthAnimate && "sm:w-14 w-14 px-[3px]",
                    (!heightanimate && !weidthAnimate) && "border border-neutral-300"
                )}
                >
                    <Suspense fallback={<>loading...</>}>
                        <BotHeader handleOpen={handleToggle} heightanimate={heightanimate} weidthAnimate={weidthAnimate} />
                    </Suspense>
                    {
                        heightanimate && weidthAnimate &&
                        <Suspense fallback={<>Loading....</>} >
                            <BotMain weidthAnimate={weidthAnimate} />
                        </Suspense>
                    }
                </div>
            </div>
        </div>
    )
}

export default Bot



