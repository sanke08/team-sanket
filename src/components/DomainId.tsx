"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner"



const DomainId = ({ snippet }: { snippet: string }) => {
    return (
        <div className=" py-4 flex flex-col gap-5 items-start">
            <Section
                label="Code snippet"
                message="Copy and paste this code snippet into the header tag of your website"
            />
            <div className="bg-cream rounded-lg inline-block relative">
                <Copy
                    className="absolute top-5 right-5 text-gray-400 cursor-pointer"
                    onClick={() => {
                        navigator.clipboard.writeText(snippet)
                        toast('Copied to clipboard')
                    }}
                />
                <pre className=" border rounded-2xl pr-10 pb-10">
                    <code className="text-gray-700">{snippet}</code>
                </pre>
            </div>
        </div>
    )
}

export default DomainId


type SectionProps = {
    label: string
    message: string
}

const Section = ({ label, message }: SectionProps) => {
    return (
        <div >
            <p className="text-sm font-medium">{label}</p>
            <p className="text-sm font-light">{message}</p>
        </div>
    )
}
