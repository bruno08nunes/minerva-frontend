"use server";

import { cookies } from "next/headers";
import z from "zod";

interface UserData {
    email: FormDataEntryValue | undefined;
    password: FormDataEntryValue | undefined;
}

export const loginAction = async (
    _prevState: { success: boolean; message: string; userData: UserData },
    formData: FormData
) => {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString()?.toString().trim();

    const authenticateBodySchema = z.object({
        email: z.string().email("Você precisa inserir um email válido!"),
        password: z.string().max(20, "Tamanho máximo de senha excedido (20)"),
    });

    const { success, error } = authenticateBodySchema.safeParse({
        email,
        password,
    });

    const userData = {
        email,
        password,
    };

    if (!success) {
        return { success: false, message: error.issues[0] ? error.issues[0].message : "Dados inválidos", userData };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
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

        if (!data.success && data.message === "Invalid credentials.") {
            return {
                success: false,
                message: "Email ou senha inválidos.",
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
            return {
                success: false,
                message:
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
