import { Icon } from "@/types/icon";
import { env } from "../env";

export default async function listIcons() {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/icons`, {
            cache: "force-cache",
            next: {
                tags: ["icons"],
            },
        });
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

export async function getIconById(id: string) {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/icons/${id}`, {
            cache: "force-cache",
            next: {
                tags: ["icons"],
            },
        });
        const {
            success,
            data,
            message,
        }: {
            success: true;
            message: string;
            data: Icon;
        } = await res.json();

        if (res.status === 404) {
            return {
                success: false,
                message: "Ícone não encontrado.",
            };
        }

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
