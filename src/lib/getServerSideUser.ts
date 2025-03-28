"use server"
import { getServerSession } from "next-auth/next"
import { authOption } from "./authOptions"
import { db } from "./prisma"

export const getSession = async () => {
    return await getServerSession(authOption)
}

export const getServerSideUser = async () => {

    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return null;
        }
        const user = await db.user.findFirst({
            where: {
                email: session.user.email
            }
        })
        if (!user) return null
        return user
    } catch (error) {
        return null
    }
} 