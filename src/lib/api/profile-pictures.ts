import type { ProfilePicture } from "@/types/profile-picture";
import { env } from "../env";

export async function listProfilePictures() {
    try {
        const resProfilePictures = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/profile-pictures`
        );

        const profilePicturesData: {
            data: ProfilePicture[];
            success: boolean;
            message: string;
        } = await resProfilePictures.json();

        return profilePicturesData;
    } catch (err) {
        if (err instanceof Error) {
            return {
                message: err.message || "Erro interno.",
                success: false,
                data: null,
            };
        }
        return { message: "Erro interno.", success: false, data: null };
    }
}
