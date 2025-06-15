import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { env } from "@/lib/env";

interface LessonExercisePageProps {
    params: Promise<{ lessonId: string }>;
}

export default async function LessonExercisePage({
    params,
}: LessonExercisePageProps) {
    const { lessonId } = await params;
    const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/lessons/${lessonId}`
    );
    const { data } = await response.json();

    return (
        <>
            <Header />
            <main>
                <H1 title={`Desafios - ${data.theme.name} - ${data.topic.name}`} />
            </main>
        </>
    );
}
