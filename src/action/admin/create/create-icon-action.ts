"use server";

import { env } from "@/lib/env";
import z from "zod";

export const createIconAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const file = formData.get("file") || undefined;
    const token = formData.get("token");

    const authenticateBodySchema = z.object({
        file: z
            .instanceof(File)
            .refine((file) => file.type.startsWith("image/"), {
                message: "O arquivo deve ser uma imagem.",
            }),
    });
    
    const { success } = authenticateBodySchema.safeParse({
        file,
    });
    
    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/icons`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData
        });
        const result = await res.json();

        if (res.status === 400) {
            return {
                success: false,
                message: "Informações incorretas",
            };
        }

        if (!result.success && !res.ok) {
            return {
                success: false,
                message: "Erro ao criar ícone. Tente novamente mais tarde.",
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
                    : "Erro ao criar ícone. Tente novamente mais tarde.",
        };
    }
};
