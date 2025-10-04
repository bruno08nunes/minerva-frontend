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

    const userData = {
        name,
        username,
        email,
        password,
    };

    if (!success) {
        return { success: false, message: "Dados inválidos!", userData };
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
            console.log(response);
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
                message: "Dados inválidos!",
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
