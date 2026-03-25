import ExerciseComponent from "@/components/exercise/Exercise";
import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { getLessonById } from "@/lib/api/lessons";
import { Metadata } from "next";
import { cookies } from "next/headers";

interface LessonExercisePageProps {
    params: Promise<{ lessonId: string }>;
}

export async function generateMetadata({
    params,
}: LessonExercisePageProps): Promise<Metadata> {
    const { lessonId } = await params;

    const { lessonData } = await getLessonById(lessonId);

    return {
        title: "Exercícios de " + lessonData?.topic.name + " | Minerva",
        description:
            "Conclua exercícios de " +
            lessonData?.topic.name +
            " usando " +
            lessonData?.theme.name +
            " como base para o aprendizado.",
        openGraph: {
            title: "Exercícios de " + lessonData?.topic.name + " | Minerva",
            description:
                "Conclua exercícios de " +
                lessonData?.topic.name +
                " usando " +
                lessonData?.theme.name +
                " como base para o aprendizado.",
            type: "website",
        },
        twitter: {
            title: "Exercícios de " + lessonData?.topic.name + " | Minerva",
            description:
                "Conclua exercícios de " +
                lessonData?.topic.name +
                " usando " +
                lessonData?.theme.name +
                " como base para o aprendizado.",
        },
    };
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
                        <ExerciseComponent
                            lesson={lessonData!}
                            token={token?.value}
                        />
                    </section>
                ) : (
                    <p>{message}</p>
                )}
            </main>
        </>
    );
}
