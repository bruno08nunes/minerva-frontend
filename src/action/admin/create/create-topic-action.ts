"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import z from "zod";

export const createTopicAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const name = formData.get("name")?.toString().trim() || undefined;
    const slug = formData.get("slug")?.toString().trim() || undefined;
    const order = Number(formData.get("order")?.toString().trim());
    const description =
        formData.get("description")?.toString().trim() || undefined;
    const token = formData.get("token");
    const iconFormDataValue = formData.get("iconId");
    const iconId = iconFormDataValue === "" ? undefined : iconFormDataValue;

    const authenticateBodySchema = z.object({
        name: z.string().min(3).max(255),
        slug: z.string().min(3).max(255),
        order: z.number().int().min(1),
        description: z.string().min(3).max(255),
        iconId: z.string(),
    });

    const { success } = authenticateBodySchema.safeParse({
        name,
        slug,
        order,
        description,
        iconId,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/topics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                name,
                slug,
                order,
                description,
                iconId,
            }),
        });
        const result = await res.json();
        revalidateTag("topics");

        if (res.status === 409) {
            return {
                success: false,
                message: "Tópico com esse slug já criado!",
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
                message: "Erro ao criar tópico. Tente novamente mais tarde.",
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
                    : "Erro ao criar tópico. Tente novamente mais tarde.",
        };
    }
};
