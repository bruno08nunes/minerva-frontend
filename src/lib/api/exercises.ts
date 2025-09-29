import { Exercise } from "@/types/exercise";
import { env } from "../env";

export const getExerciseById = async (exerciseId: string) => {
    try {
        const response = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/exercises/${exerciseId}`
        );

        const {
            data,
            success,
            message,
        }: { data: Exercise; success: true; message: string } =
            await response.json();

        if (!success) {
            return {
                success: false,
                message: "Erro ao selecionar exercício. Tente novamente mais tarde!",
            };
        }

        return { exercise: data, success, message };
    } catch {
        return {
            success: false,
            message: "Erro ao selecionar exercício. Tente novamente",
        };
    }
}