"use server";

import { env } from "@/lib/env";
import { parseMarkdownLike } from "@/utils/parseMarkdown";
import { revalidateTag } from "next/cache";
import z from "zod";

export const editExplanationAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const title = formData.get("title");
    const description = formData.get("description");
    const contentText = formData.get("content")?.toString();
    const content = parseMarkdownLike(contentText!);
    const topicId = formData.get("topicId");
    const token = formData.get("token");
    const id = formData.get("id");

    const authenticateBodySchema = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        content: z
            .array(
                z.object({
                    type: z.enum(["paragraph", "code"]),
                    data: z.string(),
                })
            )
            .optional(),
        topicId: z.string().uuid().optional(),
    });

    const { success } = authenticateBodySchema.safeParse({
        title,
        description,
        content,
        topicId,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/explanations/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, content, topicId }),
            }
        );
        const result = await res.json();
        revalidateTag("explanations");

        if (res.status === 404) {
            return {
                success: false,
                message: "Explicação não encontrada!",
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
                    "Erro ao editar explicação. Tente novamente mais tarde.",
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
                    : "Erro ao editar explicação. Tente novamente mais tarde.",
        };
    }
};
