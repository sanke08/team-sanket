"use client";

import { logout } from "@/actions";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserButton = () => {
    const [user, setUser] = useState<null | { name: string; email: string }>(null);
    const router = useRouter()

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/user"); // API to check user auth status
                const data = await res.json();
                if (data) setUser(data);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className=" w-fit ml-auto">
            {user ? (
                <  div className=" flex gap-3">
                    <p className=" rounded-full p-2 w-10 h-10 aspect-square flex justify-center items-center  border border-neutral-400">{user?.name[0]}</p>
                    <Button
                        onClick={async () => {
                            const { success, error } = await logout()
                            if (success) {
                                setUser(null)
                                router.refresh()
                                router.replace("/")
                            }
                            if (error) toast(error)

                        }}
                        className="px-4 py-2 rounded"
                    >
                        Logout
                    </Button>
                </  div>
            ) : (
                <a
                    href="/auth/login"
                    className=" px-4 py-2 rounded"
                >
                    <Button>
                        Login
                    </Button>
                </a>
            )}
        </div>
    );
};

export default UserButton;


