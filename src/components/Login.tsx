"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const result = await login(formData);
        setLoading(false);

        if (result.error) {
            toast(result.error)
        } else {
            router.refresh()
            router.push("/domain")
            document.cookie = `token=${result.token}; path=/;`;

            toast("Logged in successfully!");
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 w-72 flex-col items-center justify-center flex">
            <Input placeholder="Email" name="email" />
            <Input placeholder="Password" type="password" name="password" />
            <Button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
}
