import type { Explanation } from "@/types/explanation";
import { env } from "../env";

export async function listExplanationsByTopicSlug({ slug }: { slug: string }) {
    try {
        const res = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/explanations/list/${slug}`
        );

        const {
            success,
            message,
            data,
        }: {
            success: boolean;
            message: string;
            data: Explanation[];
        } = await res.json();

        return { success, message, data };
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, message: err.message || "Erro interno." };
        }
        return { success: false, message: "Erro interno." };
    }
}

export async function getExplanationById({ id }: { id: string }) {
    try {
        const res = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/explanations/${id}`
        );
        const {
            data,
            success,
            message,
        }: { data: Explanation; success: boolean; message: string } =
            await res.json();

        if (!res.ok) {
            throw new Error("Explicação não encontrada.");
        }

        return { data, success, message };
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, message: err.message || "Erro interno." };
        }
        return { success: false, message: "Erro interno." };
    }
}
