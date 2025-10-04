"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import z from "zod";

export const editChoiceAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const text = formData.get("text");
    const order = Number(formData.get("order"));
    const isCorrect = formData.get("isCorrect") === "on" ? true : false;
    const id = formData.get("id");
    const token = formData.get("token");

    const authenticateBodySchema = z.object({
        text: z.string(),
        order: z.number().int(),
        isCorrect: z.boolean(),
    });

    const { success } = authenticateBodySchema.safeParse({
        text,
        order,
        isCorrect
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/choices/${id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, order, isCorrect }),
        });
        const result = await res.json();
        revalidateTag("exercises");
        revalidateTag("lessons");

        if (res.status === 404) {
            return {
                success: false,
                message: "Escolha não encontrado!",
            };
        }

        if (res.status === 400) {
            return {
                success: false,
                message: "Informações incorretas",
            };
        }

        if (!result.success && !res.ok) {
            return {
                success: false,
                message:
                    "Erro ao editar escolha. Tente novamente mais tarde.",
            };
        }

        return {
            success: true,
            message: "Sucesso!",
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message:
                err instanceof Error
                    ? err.message
                    : "Erro ao editar escolha. Tente novamente mais tarde.",
        };
    }
};
