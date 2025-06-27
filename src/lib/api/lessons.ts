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
    themeSlug,
    topicSlug,
    token,
}: {
    themeSlug: string;
    topicSlug: string;
    token?: string;
}) {
    try {
        const response = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/lessons/list?themeId=${themeSlug}&topicId=${topicSlug}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
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

export async function winLesson({ token, lesson }: {token: string, lesson: Lesson}) {
    // TODO: Melhorar o funcionamento dessa função
    const resProgress = fetch(`${env.NEXT_PUBLIC_API_URL}/progress`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            lessonId: lesson.id,
            isCompleted: true
        })
    });
    const resUserStreak = fetch(`${env.NEXT_PUBLIC_API_URL}/users/streak`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    const resUserXP = fetch(`${env.NEXT_PUBLIC_API_URL}/users/xp`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: lesson.rewardXP
        })
    });

    try {
        const res = await Promise.all([resProgress, resUserStreak, resUserXP]);

        return res;
    } catch (err) {
        return err;
    }
};