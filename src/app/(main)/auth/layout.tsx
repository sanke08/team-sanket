import { getUser } from '@/actions'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
    const user = await getUser()
    if (user) return redirect("/")
    return (
        <div>
            {children}
        </div>
    )
}

export default layout
