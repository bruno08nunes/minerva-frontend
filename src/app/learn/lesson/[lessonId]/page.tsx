import ExerciseComponent from "@/components/exercise/Exercise";
import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { getLessonById } from "@/lib/api/lessons";

interface LessonExercisePageProps {
    params: Promise<{ lessonId: string }>;
}

export default async function LessonExercisePage({
    params,
}: LessonExercisePageProps) {
    const { lessonId } = await params;
    const { success, lessonData, message } = await getLessonById(lessonId);

    return (
        <>
            <Header />
            <main>
                {success ? (
                    <>
                        <H1
                            title={`Desafios - ${lessonData!.theme.name} - ${
                                lessonData!.topic.name
                            }`}
                        />
                        <ExerciseComponent lesson={lessonData!} />
                    </>
                ) : (
                    <p>{message}</p>
                )}
            </main>
        </>
    );
}
