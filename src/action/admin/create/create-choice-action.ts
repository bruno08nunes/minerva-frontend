"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import z from "zod";

export const createChoiceAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const text = formData.get("text");
    const order = Number(formData.get("order"));
    const isCorrect = formData.get("isCorrect") === "on" ? true : false;
    const exerciseId = formData.get("exerciseId");
    const token = formData.get("token");

    const authenticateBodySchema = z.object({
        text: z.string(),
        order: z.number().int(),
        isCorrect: z.boolean(),
        exerciseId: z.string().uuid(),
    });

    const { success } = authenticateBodySchema.safeParse({
        text,
        order,
        isCorrect,
        exerciseId
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/choices`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                isCorrect,
                exerciseId,
                order
            }),
        });
        const result = await res.json();
        revalidateTag("choices");
        revalidateTag("lessons");

        if (res.status === 400) {
            return {
                success: false,
                message: "Informações incorretas",
            };
        }

        if (!result.success && !res.ok) {
            return {
                success: false,
                message: "Erro ao criar escolha. Tente novamente mais tarde.",
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
                    : "Erro ao criar escolha. Tente novamente mais tarde.",
        };
    }
};
