"use server";

import { cookies } from "next/headers";
import z from "zod";

export const registerAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

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

    const { success, } = authenticateBodySchema.safeParse({
        name,
        username,
        email,
        password,
    });

    if (!success) {
        return { success: false, message: "Dados inválidos!" };
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
            };
        }

        const data = await response.json();

        if (!data.success && data.message === "User already exists.") {
            return {
                success: false,
                message: "Usuário com esse email já existente.",
            };
        }

        if (!data.success && data.message === "Validation error.") {
            return {
                success: false,
                message: "Dados inválidos!",
            };
        }

        if (!data.success) {
            console.error("Erro", data.message);
            return {
                success: false,
                message:
                    data.message ||
                    "Erro ao fazer login. Tente novamente mais tarde.",
            };
        }

        const cookiesStore = await cookies();
        cookiesStore.set("token", data.token, {
            httpOnly: false,
            maxAge: 60 * 60,
        });

        return { success: true, message: "Login concluído." };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message:
                err instanceof Error
                    ? err.message
                    : "Erro ao fazer login. Tente novamente mais tarde.F",
        };
    }
};
