import { Topic } from "@/types/topic";
import { env } from "../env";

interface TopicsListResponse {
    success: boolean;
    message: string;
    data: Topic[];
}

export async function listTopics() {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/topics`);
        const { data, message, success }: TopicsListResponse =
            await response.json();

        if (!success) {
            return {
                success: false,
                message: "Erro ao listar tópicos. Tente novamente mais tarde!",
            };
        }

        return { topicsData: data, success, message };
    } catch {
        return {
            success: false,
            message: "Erro ao listar tópicos. Tente novamente mais tarde!",
        };
    }
}
