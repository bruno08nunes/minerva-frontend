"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";

export const deleteIcon = async (id: string, token: string) => {
    "use server";

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/icons/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    revalidateTag("icons");
    return !res.ok;
}