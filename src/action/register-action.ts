"use server";

import { cookies } from "next/headers";
import z from "zod";

interface UserData {
    name: string | undefined;
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

export const registerAction = async (
    _prevState: { success: boolean; message: string; userData: UserData },
    formData: FormData
) => {
    const name = formData.get("name")?.toString().trim();
    const username = formData.get("username")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    const authenticateBodySchema = z.object({
        name: z.string().min(3, "Seu nome deve ter no mínimo 3 caracteres").max(255, "Tamanho máximo de nome excedido (255)"),
        username: z
            .string()
            .min(3, "Seu nome de usuário deve ter ao menos 3 caracteres")
            .max(20, "Seu nome de usuário deve ter no máximo 20 caracteres")
            .regex(/^[a-zA-Z0-9_]+$/, "Seu nome de usuário deve conter apenas letras, números ou underline (_)"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "Sua senha deve ter ao menos 6 caracteres").max(20, "Tamanho máximo de senha excedido (20"),
    });

    const { success, error } = authenticateBodySchema.safeParse({
        name,
        username,
        email,
        password,
    });

    const userData = {
        name,
        username,
        email,
        password,
    };

    if (!success) {
        return { success: false, message: error.issues[0] ? error.issues[0].message : "Dados inválidos!", userData };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name, username }),
                credentials: "include",
            }
        );

        if (response.status >= 500) {
            return {
                success: false,
                message: "Erro ao fazer login. Tente novamente mais tarde.",
                userData
            };
        }

        const data = await response.json();

        if (!data.success && data.message === "User already exists.") {
            return {
                success: false,
                message: "Usuário com esse email já existente.",
                userData
            };
        }

        if (!data.success && data.message === "Validation error.") {
            return {
                success: false,
                message: data.issues[0] ? data.issues[0].message : "Dados inválidos!",
                userData
            };
        }

        if (!data.success) {
            console.error("Erro", data.message);
            return {
                success: false,
                message:
                    data.message ||
                    "Erro ao fazer login. Tente novamente mais tarde.",
                userData
            };
        }

        const cookiesStore = await cookies();
        cookiesStore.set("token", data.token, {
            httpOnly: false,
            maxAge: 60 * 60 * 24,
        });

        return { success: true, message: "Login concluído.", userData };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message:
                err instanceof Error
                    ? err.message
                    : "Erro ao fazer login. Tente novamente mais tarde.F",
            userData
        };
    }
};
