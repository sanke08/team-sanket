
import { cn } from "@/lib/utils"
import { useEffect, useRef, } from "react"
import { ScrollArea } from "../ui/scroll-area"


interface BotMessagesProps {
    messages: {
        parts: { text: string }[],
        role: "user" | "model"
    }[]
    isPending: boolean
    weidthAnimate: boolean
    handleSubmit: () => void
    setInput: (val: string) => void
}


const BotMessages = ({ messages, isPending, weidthAnimate, handleSubmit, setInput }: BotMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (weidthAnimate)
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const handleClick = (que: string) => {
        setInput(que);
        handleSubmit()
    }

    return (
        <ScrollArea className=" pr-2 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-1 h-full">


                {messages.map((message, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: message.parts[0].text }} className={cn(
                        "bg-neutral-200 w-fit px-2 py-1 rounded-lg text-sm",
                        message.role === "user" && "self-end"
                    )} />
                ))}
                {
                    isPending &&
                    <p className=" w-[40%] h-8 bg-neutral-400 animate-pulse rounded-lg" />
                }
            </div>
            <div ref={messagesEndRef} />
        </ScrollArea>
    )
}

export default BotMessages


const directQuestion = [
    "Is there a Contact info?",
    "What is the best course to start with?",
    "What kind of courses do you offer?",
    "Do you offer career counseling?",
    "What is this website about?",
]