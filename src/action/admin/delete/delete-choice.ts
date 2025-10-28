"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";

export const deleteChoice = async (id: string, token: string) => {
    "use server";

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/choices/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    revalidateTag("choices");
    return !res.ok;
}