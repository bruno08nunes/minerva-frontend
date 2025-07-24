"use server";

import { env } from "@/lib/env";
import z from "zod";

export const editUserAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const token = formData.get("token");

    const authenticateBodySchema = z.object({
        name: z.string(),
        username: z
            .string()
            .min(3)
            .max(20)
            .regex(/^[a-zA-Z0-9_]+$/),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { success } = authenticateBodySchema.safeParse({
        name,
        username,
        email,
        password,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
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
            }),
        });
        const result = await res.json();

        if (res.status === 401 || res.status === 404) {
            return {
                success: false,
                message:
                    "Informações de login incorretas! Faça login novamente para continuar.",
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
                message: "Erro ao editar usuário. Tente novamente mais tarde.",
            };
        }

        return {
            success: true,
            message: typeof username === "string" ? username : "",
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message:
                err instanceof Error
                    ? err.message
                    : "Erro ao editar usuário. Tente novamente mais tarde.",
        };
    }
};
