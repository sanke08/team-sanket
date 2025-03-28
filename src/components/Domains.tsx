import { getUser } from "@/actions";
import { db } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

const Domains = async () => {
    const user = await getUser()
    if (!user) return

    const domains = await db.domain.findMany({
        where: {
            userId: user.id
        }
    });


    return (
        <div className="p-6 space-y-4 px-20">
            <h1 className="text-2xl font-bold">Your Domains</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {domains.map((domain) => (
                    <div className=" flex items-center justify-between w-full border rounded-lg p-2">
                        <div className=" text-2xl font-medium">{domain.domain}</div>
                        <Link href={"/domain/" + domain.id}>
                            <Button className=" cursor-pointer">
                                Manage
                            </Button>
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Domains
