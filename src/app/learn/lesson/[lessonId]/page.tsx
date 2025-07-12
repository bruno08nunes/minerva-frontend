import ExerciseComponent from "@/components/exercise/Exercise";
import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { getLessonById } from "@/lib/api/lessons";
import { cookies } from "next/headers";

interface LessonExercisePageProps {
    params: Promise<{ lessonId: string }>;
}

export default async function LessonExercisePage({
    params,
}: LessonExercisePageProps) {
    const { lessonId } = await params;
    const { success, lessonData, message } = await getLessonById(lessonId);
    const token = (await cookies()).get("token");

    return (
        <>
            <Header />
            <main className="p-4">
                {success ? (
                    <section className="relative">
                        <H1
                            title={`Desafios - ${lessonData!.theme.name} - ${
                                lessonData!.topic.name
                            }`}
                        />
                        <ExerciseComponent lesson={lessonData!} token={token?.value} />
                    </section>
                ) : (
                    <p>{message}</p>
                )}
            </main>
        </>
    );
}
