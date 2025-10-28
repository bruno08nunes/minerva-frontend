"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";

export const deleteProfilePicture = async (id: string, token: string) => {
    "use server";

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/profile-pictures/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    revalidateTag("profilePictures");
    return !res.ok;
}