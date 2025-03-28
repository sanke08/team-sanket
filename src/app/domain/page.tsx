"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerDomain } from "@/actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function DomainPage() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setLoading(true);
        const response = await registerDomain(data);
        setLoading(false);

        if (response.success) {
            toast("Domain registered successfully!");
            router.push("/dashboard"); // Redirect on success
        } else {
            toast("something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Register Your Domain</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="domain">Domain Name</Label>
                    <Input id="domain" {...register("domain", { required: true })} placeholder="yourdomain.com" />
                </div>

                <div>
                    <Label htmlFor="prompt">AI Bot Prompt</Label>
                    <Textarea id="prompt" {...register("prompt", { required: true })} placeholder="How should the AI respond?" className=" min-h-60" />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </Button>
            </form>

        </div>
    );
}
