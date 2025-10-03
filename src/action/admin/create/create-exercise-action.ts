"use server";

import { env } from "@/lib/env";
import { parseMarkdownLike } from "@/utils/parseMarkdown";
import { revalidateTag } from "next/cache";
import z from "zod";

export const createExerciseAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const hint = formData.get("hint");
    const contentText = formData.get("content")?.toString();
    const content = parseMarkdownLike(contentText!);
    const type = formData.get("type");
    const lessonId = formData.get("lessonId");
    const token = formData.get("token");

    const authenticateBodySchema = z.object({
        hint: z.string(),
        type: z.string(),
        content: z.array(
            z.object({
                type: z.enum(["paragraph", "code"]),
                data: z.string(),
            })
        ),
        lessonId: z.string().uuid(),
    });

    const { success } = authenticateBodySchema.safeParse({
        hint,
        type,
        content,
        lessonId,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/exercises`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type,
                content,
                hint,
                lessonId
            }),
        });
        const result = await res.json();
        revalidateTag("exercises");
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
                message: "Erro ao criar exercício. Tente novamente mais tarde.",
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
                    : "Erro ao criar exercício. Tente novamente mais tarde.",
        };
    }
};
