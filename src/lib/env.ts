import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:3333")
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("❌ Invalid environment variables", _env.error.format());

    throw new Error("O site está fora do momento. Estamos consertando. Tente novamente mais tarde.");
}

export const env = _env.data;