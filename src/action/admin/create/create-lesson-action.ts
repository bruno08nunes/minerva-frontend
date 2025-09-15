"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import z from "zod";

export const createLessonAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const name = formData.get("name");
    const description = formData.get("description");
    const rewardXP = Number(formData.get("rewardXP"));
    const order = Number(formData.get("order"));
    const themeId = formData.get("themeId");
    const topicId = formData.get("topicId");
    const iconId = formData.get("iconId");
    const token = formData.get("token");

    const authenticateBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        rewardXP: z.number().int(),
        order: z.number().int(),
        topicId: z.string().uuid(),
        themeId: z.string().uuid(),
        iconId: z.string().uuid(),
    });

    const { success } = authenticateBodySchema.safeParse({
        name,
        description,
        rewardXP,
        order,
        topicId,
        themeId,
        iconId,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/lessons`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                rewardXP,
                order,
                topicId,
                themeId,
                iconId,
            }),
        });
        const result = await res.json();
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
                message: "Erro ao criar lição. Tente novamente mais tarde.",
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
                    : "Erro ao criar lição. Tente novamente mais tarde.",
        };
    }
};
