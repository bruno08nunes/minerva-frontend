"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export const loginAction = async (
    _prevState: { success: boolean; message: string },
    formData: FormData
) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { success } = authenticateBodySchema.safeParse({
        email,
        password,
    });

    if (!success) {
        // toast("Dados inválidos!");
        return { success: false, message: "Dados inválidos" };
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

        if (!response.ok) {
            console.log(response);
            // toast("Erro ao fazer login. Tente novamente mais tarde.");
            return {
                success: false,
                message: "Erro ao fazer login. Tente novamente mais tarde.",
            };
        }

        const data = await response.json();

        if (!data.success) {
            console.error("Erro", data.message);
            // toast(data.message || "Erro")
            return { success: false, message: data.message || "Erro" };
        }

        const cookiesStore = await cookies();
        cookiesStore.set("token", data.token, {
            httpOnly: false,
            maxAge: 60 * 60,
        });

        redirect("/");
    } catch (err) {
        console.log(err);
        // toast(err instanceof Error ? err.message : "Erro");
        return {
            success: false,
            message: err instanceof Error ? err.message : "Erro",
        };
    }
};
