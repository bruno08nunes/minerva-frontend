"use server";

import { env } from "@/lib/env";
import { cookies } from "next/headers";
import z from "zod";
import { string } from "zod/v4";

export const editUserAction = async (
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
        return { success: true, message: typeof username === "string" ? username : "" };
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
