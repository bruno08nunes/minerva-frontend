"use server";

import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import z from "zod";

export const editProfilePictureAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const file = formData.get("file");
    const description = formData.get("description")?.toString().trim();
    const id = formData.get("id")?.toString().trim();
    const token = formData.get("token")?.toString().trim();

    const authenticateBodySchema = z.object({
        file: z
            .instanceof(File)
            .refine((file) => file.type.startsWith("image/"), {
                message: "O arquivo deve ser uma imagem.",
            }),
        description: z.string().max(255),
    });

    const { success } = authenticateBodySchema.safeParse({
        file,
        description,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/profile-pictures/${id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        });
        const result = await res.json();
        revalidateTag("profilePictures");

        if (res.status === 404) {
            return {
                success: false,
                message: "Ícone não encontrado!",
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
                message: "Erro ao editar ícone. Tente novamente mais tarde.",
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
                    : "Erro ao editar ícone. Tente novamente mais tarde.",
        };
    }
};
