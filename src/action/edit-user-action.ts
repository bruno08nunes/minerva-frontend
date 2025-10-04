"use server";

import { env } from "@/lib/env";
import z from "zod";

interface UserData {
    name: string | undefined;
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
    profilePictureId: FormDataEntryValue | null | undefined;
}

export const editUserAction = async (
    _prevState: { success: boolean; message: string; data: UserData },
    formData: FormData
) => {
    const name = formData.get("name")?.toString().trim() || undefined;
    const username = formData.get("username")?.toString().trim() || undefined;
    const email = formData.get("email")?.toString().trim() || undefined;
    const password = formData.get("password")?.toString().trim() || undefined;
    const token = formData.get("token");
    const profilePictureFormDataValue = formData.get("profilePictureId");
    const profilePictureId =
        profilePictureFormDataValue === ""
            ? undefined
            : profilePictureFormDataValue;

    const authenticateBodySchema = z.object({
        name: z.string().min(3).max(255).optional(),
        username: z
            .string()
            .min(3)
            .max(20)
            .regex(/^[a-zA-Z0-9_]+$/)
            .optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).max(20).optional(),
        profilePictureId: z.string().nullable().optional(),
    });

    const { success } = authenticateBodySchema.safeParse({
        name,
        username,
        email,
        password,
        profilePictureId,
    });

    const data = {
        name,
        username,
        email,
        password,
        profilePictureId,
    };

    if (!success) {
        return { success: false, message: "Dados inválidos!", data };
    }

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                name,
                username,
                email,
                password,
                profilePictureId,
            }),
        });
        const result = await res.json();

        if (res.status === 401 || res.status === 404) {
            return {
                success: false,
                message:
                    "Informações de login incorretas! Faça login novamente para continuar.",
                data,
            };
        }

        if (res.status === 400) {
            return {
                success: false,
                message: "Informações incorretas",
                data,
            };
        }

        if (!result.success && !res.ok) {
            return {
                success: false,
                message: "Erro ao editar usuário. Tente novamente mais tarde.",
                data,
            };
        }

        return {
            success: true,
            message: typeof username === "string" ? username : "",
            data,
        };
    } catch (err) {
        return {
            success: false,
            message:
                err instanceof Error
                    ? err.message
                    : "Erro ao editar usuário. Tente novamente mais tarde.",
            data,
        };
    }
};
