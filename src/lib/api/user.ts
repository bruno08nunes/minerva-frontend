import { env } from "@/lib/env";
import type { User } from "@/types/user";

export async function getUserProfile({ username }: { username: string }):
    Promise<{ user: User; message: string; success: true; } | { message: string; success: false; }> {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${username}`);
        const {
            user,
            message,
            success,
        }: { user: User; message: string; success: boolean } = await res.json();

        if (res.status === 404) {
            throw new Error("Usuário não encontrado.");
        }

        return { user, message, success };
    } catch (err) {
        if (err instanceof Error) {
            return { message: err.message || "Erro interno.", success: false };
        }
        return { message: "Erro interno.", success: false };
    }
}
