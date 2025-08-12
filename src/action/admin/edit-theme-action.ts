"use server";

import { env } from "@/lib/env";
import z from "zod";

export const editThemeAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const name = formData.get("name")?.toString().trim() || undefined;
    const slug = formData.get("slug")?.toString().trim() || undefined;
    const description =
        formData.get("description")?.toString().trim() || undefined;
    const token = formData.get("token");
    const iconFormDataValue = formData.get("iconId");
    const iconId = iconFormDataValue === "" ? undefined : iconFormDataValue;
    const id = formData.get("themeId");

    const authenticateBodySchema = z.object({
        name: z.string().min(3).max(255).optional(),
        slug: z.string().min(3).max(255).optional(),
        description: z.string().min(3).max(255).optional(),
        iconId: z.string().nullable().optional(),
        id: z.string(),
    });

    const { success } = authenticateBodySchema.safeParse({
        name,
        slug,
        description,
        iconId,
        id,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/themes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                name,
                slug,
                description,
                iconId,
            }),
        });
        const result = await res.json();

        if (res.status === 404) {
            return {
                success: false,
                message: "Tema não encontrado!",
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
                message: "Erro ao editar tema. Tente novamente mais tarde.",
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
                    : "Erro ao editar tema. Tente novamente mais tarde.",
        };
    }
};
