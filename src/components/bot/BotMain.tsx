import useChatMessage from "@/hooks/useChatMessage"
import { lazy, Suspense } from "react"

const BotMessages = lazy(() => import("./BotMessages"))
const BotInput = lazy(() => import("./BotInput"))

const BotMain = ({ weidthAnimate }: { weidthAnimate: boolean }) => {
    const { messages, input, isPending, send, setInput } = useChatMessage()

    return (
        <Suspense fallback={<>Loading...</>}>
            <div className=" flex flex-col h-[94%] pt-1">
                <BotMessages messages={messages} isPending={isPending} weidthAnimate={weidthAnimate} handleSubmit={() => send()} setInput={setInput} />
                <BotInput value={input} onChange={(e) => setInput(e.target.value)} handleSubmit={() => send()} />
            </div>
        </Suspense>
    )
}

export default BotMain
