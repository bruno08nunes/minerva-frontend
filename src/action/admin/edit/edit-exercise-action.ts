"use server";

import { env } from "@/lib/env";
import { parseMarkdownLike } from "@/utils/parseMarkdown";
import { revalidateTag } from "next/cache";
import z from "zod";

export const editExerciseAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const hint = formData.get("hint");
    const contentText = formData.get("content")?.toString();
    const content = parseMarkdownLike(contentText!);
    const token = formData.get("token");
    const id = formData.get("id");

    const authenticateBodySchema = z.object({
        hint: z.string(),
        content: z
            .array(
                z.object({
                    type: z.enum(["paragraph", "code"]),
                    data: z.string(),
                })
            )
            .optional(),
    });

    const { success } = authenticateBodySchema.safeParse({
        hint,
        content,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/exercises/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ hint, content }),
            }
        );
        const result = await res.json();
        console.log(result)
        revalidateTag("exercises");

        if (res.status === 404) {
            return {
                success: false,
                message: "Exercício não encontrado!",
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
                    "Erro ao editar exercício. Tente novamente mais tarde.",
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
                    : "Erro ao editar exercício. Tente novamente mais tarde.",
        };
    }
};
