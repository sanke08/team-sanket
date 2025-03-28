

import { getMessage } from "@/actions";
import { useState } from "react";



const useChatMessage = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: "user" | "model", parts: { text: string }[] }[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    const send = async () => {
        if (!input.trim()) return;

        setIsPending(true);
        setIsError(false);

        try {
            // Add user message to state
            setMessages((prev) => [...prev, { role: "user", parts: [{ text: input }] }]);

            const { message } = await getMessage(messages, input)
            setMessages((prev) => [...prev, message]);
            setInput("");
        } catch (error) {
            console.error("Error:", error);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    };

    return { send, messages, isPending, isError, input, setInput };
};

export default useChatMessage;
