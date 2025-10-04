import { Choice } from "@/types/choice";
import { env } from "../env";

export async function getChoiceById(id: string) {
    try {
        const response = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/choices/${id}`
        );

        const {
            data,
            success,
            message,
        }: { data: Choice; success: true; message: string } =
            await response.json();

        if (!success) {
            return {
                success: false,
                message:
                    "Erro ao selecionar exercício. Tente novamente mais tarde!",
            };
        }

        return { choice: data, success, message };
    } catch {
        return {
            success: false,
            message: "Erro ao selecionar exercício. Tente novamente",
        };
    }
}
