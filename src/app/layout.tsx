import { ReactNode } from "react"

import "./globals.css"

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}

export default layout
