

import GoogleProvider from "next-auth/providers/google"
import { AuthOptions, User } from "next-auth"
import { db } from "@/lib/db"
import { AdapterUser } from "next-auth/adapters"



export const authOption: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: User | AdapterUser }) {
            try {

                if (!user.email) return false
                const existUser = await db.user.findFirst({
                    where: {
                        email: user.email ? user.email : ""
                    }
                })
                if (!existUser) {
                    await db.user.create({
                        data: {
                            email: user.email,
                            avatar: user.image || "",
                            fullname: user.name ? user.name : "",
                            type: ""
                        }
                    })
                }
                return true
            } catch (error) {
                return false
            }

        },
        redirect() {
            return "/"
        }
    },

    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

}

