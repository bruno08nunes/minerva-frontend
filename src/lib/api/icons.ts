import { Icon } from "@/types/icon";
import { env } from "../env";

export default async function listIcons() {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/icons`);
        const {
            success,
            data,
            message,
        }: {
            success: true;
            message: string;
            data: Icon[];
        } = await res.json();

        if (!res.ok || !success) {
            return {
                message: message || "Erro interno! Tente novamente mais tarde.",
                success: false,
            };
        }

        return { success, message, data };
    } catch (err) {
        if (err instanceof Error) {
            return {
                message:
                    err.message || "Erro interno! Tente novamente mais tarde.",
                success: false,
            };
        }

        return {
            message: "Erro interno! Tente novamente mais tarde.",
            success: false,
        };
    }
}
