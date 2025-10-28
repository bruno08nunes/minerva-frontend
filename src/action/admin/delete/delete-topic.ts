"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";

export const deleteTopic = async (id: string, token: string) => {
    "use server";

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/topics/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    revalidateTag("topics");
    return !res.ok;
}