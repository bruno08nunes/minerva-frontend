import type { Lesson } from "@/types/lesson";
import { env } from "../env";

export async function getLessonById(lessonId: string) {
    try {
        const response = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/lessons/${lessonId}`
        );

        const {
            data,
            success,
            message,
        }: { data: Lesson; success: true; message: string } =
            await response.json();

        if (!success) {
            return {
                success: false,
                message: "Erro ao gerar desafio. Tente novamente mais tarde!",
            };
        }

        return { lessonData: data, success, message };
    } catch {
        return {
            success: false,
            message: "Erro ao gerar desafios. Tente novamente",
        };
    }
}

interface LessonsListResponse {
    success: boolean;
    message: string;
    data: Lesson[];
}

export async function listLessonsByTopicAndTheme({
    themeId,
    topicId,
}: {
    themeId: string;
    topicId: string;
}) {
    // TODO: change the backend to receive the theme slug and topicSlug
    try {
        const response = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/lessons/list?themeId=${themeId}&topicId=${topicId}`
        );
        const { data, success, message }: LessonsListResponse =
            await response.json();

        if (!success) {
            return {
                success: false,
                message: "Erro ao listar lições. Tente novamente mais tarde!",
            };
        }

        return { lessonsData: data, success, message };
    } catch {
        return {
            success: false,
            message: "Erro ao listar lições. Tente novamente",
        };
    }
}
