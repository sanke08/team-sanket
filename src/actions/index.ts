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
        return { error: error.message };
    }
}



import { cookies } from "next/headers";
import { GoogleGenerativeAI } from "@google/generative-ai";


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





export async function logout() {
    try {
        (await cookies()).delete("token");
        return { success: "Logged out successfully" };
    } catch (error: any) {
        return { error: "An error occurred during logout" };
    }
}



export const getMessage = async (messages: any, input: string) => {
    const genAI = new GoogleGenerativeAI("AIzaSyBjGX8NjJFua1YKn4mn1SLJR1UuyFTxNTg");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };




    const chat = await model.startChat({
        history: [
            {
                role: "user",
                parts: [
                    {
                        text: ` 
                        Corinna AI Chatbot – Smart, Intuitive, and Emotionally Intelligent
                        🚀 Corinna is a cutting-edge SaaS platform that helps businesses register domains and build AI-powered chatbots with low-code functionality.

                            Why Choose Corinna?
                            ✅ Domain Registration Made Easy – Secure your online identity with a seamless domain setup.
                            ✅ AI-Powered Chatbots – Create intelligent chatbots that engage customers 24/7.
                            ✅ Emotional Intelligence – Our AI understands customer emotions and adapts responses accordingly.
                            ✅ Low-Code, High Impact – No coding skills? No problem! Build and deploy a chatbot in minutes.
                            ✅ Boost Engagement & Conversions – Improve customer experience and drive sales with smart automation.

                            How It Works
                            1️⃣ Register your domain 🌐
                            2️⃣ Customize your AI chatbot 🤖
                            3️⃣ Integrate with your website or business tools 🔗
                            4️⃣ Start engaging customers with emotion-aware AI 💙

                            💡 Want to see Corinna in action? Explore our platform and experience the power of AI-driven conversations!
                                    
                        `
                    }
                ]
            },
            ...messages
        ],
        generationConfig,
    });


    const result = await chat.sendMessage(input);
    const response = await result.response;

    // Handle errors
    if (!response || !response.candidates) {
        return {
            message: {
                role: "model" as const,
                parts: [{ text: "Technical error" }],
            }
        }
    }

    const message = {
        role: "model" as const,
        parts: [{ text: response?.candidates[0].content.parts[0].text || "" }],
    };

    return { message }

}



const updateDomainSchema = z.object({
    id: z.string().uuid(),
    domain: z.string().min(3, "Domain must be at least 3 characters long"),
    prompt: z.string().min(5, "Prompt must be at least 5 characters long"),
});

export async function updateDomain(data: any) {
    const parsed = updateDomainSchema.safeParse(data);

    if (!parsed.success) {
        return { success: false, error: parsed.error.errors[0].message };
    }

    try {
        const user = await getUser();
        if (!user) return { success: false, error: "Unauthorized" };

        const existingDomain = await db.domain.findUnique({
            where: { id: parsed.data.id },
        });

        if (!existingDomain || existingDomain.userId !== user.id) {
            return { success: false, error: "Domain not found or unauthorized" };
        }

        const updatedDomain = await db.domain.update({
            where: { id: parsed.data.id },
            data: {
                domain: parsed.data.domain,
                prompt: parsed.data.prompt,
            },
        });

        return { success: true, domain: updatedDomain };
    } catch (error) {
        return { success: false, error: "Failed to update domain" };
    }
}



export async function deleteDomain(id: string) {
    if (!id) return { success: false, error: "Domain ID is required" };

    try {
        const user = await getUser();
        if (!user) return { success: false, error: "Unauthorized" };

        const existingDomain = await db.domain.findUnique({
            where: { id },
        });

        if (!existingDomain || existingDomain.userId !== user.id) {
            return { success: false, error: "Domain not found or unauthorized" };
        }

        await db.domain.delete({
            where: { id },
        });

        return { success: true, message: "Domain deleted successfully" };
    } catch (error) {
        return { success: false, error: "Failed to delete domain" };
    }
}
