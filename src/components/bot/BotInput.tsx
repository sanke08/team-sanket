
import { Send, SendHorizonal } from "lucide-react"
import { KeyboardEvent, } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


interface InputContainerProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: () => void
    value: string
}
const BotInput = ({ onChange, handleSubmit, value }: InputContainerProps) => {

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit(); // Trigger the send action on Enter key press
        }
    };
    return (
        <div className="flex items-center gap-2 py-2">
            <Input onChange={onChange} value={value} className="w-full" onKeyDown={handleKeyDown} />
            <Button onClick={handleSubmit} size={"icon"} className="cursor-pointer rounded-lg border">

                <Send />
            </Button>
        </div>
    )

}

export default BotInput
