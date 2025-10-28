"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";

export const deleteExercise = async (id: string, token: string) => {
    "use server";

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/exercises/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    revalidateTag("exercises");
    return !res.ok;
}