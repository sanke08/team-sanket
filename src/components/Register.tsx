"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { toast } from "sonner";
import { registerdata } from "@/actions";

const registerSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setLoading(true);
        const formData = new FormData();
        // @ts-ignore
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));

        const result = await registerdata(formData);
        setLoading(false);

        if (result?.error) {
            toast(result.error);
        } else {
            toast("User registered successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-72 flex flex-col items-center justify-center">
            <Input placeholder="Name" {...register("name")} />
            <Input placeholder="Email" {...register("email")} />
            <Input placeholder="Password" type="password" {...register("password")} />
            <Button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button>
        </form>
    );
}
