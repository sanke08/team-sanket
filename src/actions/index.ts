"use server"

import { z } from "zod";
import jwt from "jsonwebtoken"
import { db } from "@/lib/prisma";

// export const JWT_SECRET = "ew65vw4v45"


const registerSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerdata(formData: FormData) {
    try {
        const data = Object.fromEntries(formData);
        const parsedData = registerSchema.parse(data);

        const existingUser = await db.user.findUnique({
            where: { email: parsedData.email },
        });

        if (existingUser) {
            return { error: "Email already in use" };
        }


        await db.user.create({
            data: { ...parsedData },
        });

        return { success: "User registered successfully" };
    } catch (error: any) {
        console.log(error)
        return { error: error.message };
    }
}






const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function login(formData: FormData) {
    try {
        const data = Object.fromEntries(formData);
        const parsedData = loginSchema.parse(data);

        const user = await db.user.findUnique({
            where: { email: parsedData.email },
        });

        if (!user) return { error: "User not found" };

        if (parsedData.password !== user.password) return { error: "Invalid credentials" };

        const token = jwt.sign({ userId: user.id, email: user.email }, "JWT_SECRET", { expiresIn: "7d" });

        return { success: "Login successful", token };
    } catch (error: any) {
        console.log(error)
        return { error: error.message };
    }
}



import { cookies } from "next/headers";


// 🟢 Get User Function
export async function getUser() {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return null;

        const decoded: any = jwt.verify(token, "JWT_SECRET");
        if (!decoded?.userId) return null;

        const user = await db.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true, createdAt: true },
        });

        return user || null;
    } catch {
        return null;
    }
}



const domainSchema = z.object({
    domain: z.string().min(3, "Domain must be at least 3 characters long"),
    prompt: z.string().min(5, "Prompt must be at least 5 characters long"),
});

export async function registerDomain(data: any) {
    const parsed = domainSchema.safeParse(data);

    if (!parsed.success) {
        return { success: false, error: parsed.error.errors[0].message };
    }

    try {
        const user = await getUser()
        console.log(user)
        if (!user) return { success: false }
        const newDomain = await db.domain.create({
            data: {
                domain: parsed.data.domain,
                prompt: parsed.data.prompt,
                userId: user?.id, // Associate domain with user
            },
        });

        return { success: true, domain: newDomain };
    } catch (error: any) {
        return { success: false, error: "Domain already exists or an error occurred." };
    }
}

