import ExerciseComponent from "@/components/exercise/Exercise";
import H1 from "@/components/layout/H1";
import Header from "@/components/layout/Header";
import { getLessonById, listLessonsByTopicAndTheme } from "@/lib/api/lessons";
import { Lesson } from "@/types/lesson";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

const checkCanMakeLesson = (lessonsArray: Lesson[], currentLesson: Lesson) => {
    const redirectUrl =
        "/learn/lessons/" +
        currentLesson?.theme.slug +
        "/" +
        currentLesson?.topic.slug;

    const isFirstLesson = currentLesson.order <= 1;
    if (!isFirstLesson) {
        const lastLessonProgress = lessonsArray.find(
            (lesson) => lesson.order === currentLesson.order - 1,
        )?.Progress;

        const hasProgress = lastLessonProgress && lastLessonProgress[0];
        if (!hasProgress || !lastLessonProgress[0].isCompleted) {
            redirect(redirectUrl);
        }
    }

    const currentLessonProgress = lessonsArray.find(
        (lesson) => lesson.order === currentLesson!.order,
    )?.Progress;

    const hasProgress = currentLessonProgress && currentLessonProgress[0];
    if (hasProgress) {
        if (currentLessonProgress[0].isCompleted) {
            redirect(redirectUrl);
        }
    }
};

export default async function LessonExercisePage({
    params,
}: LessonExercisePageProps) {
    const { lessonId } = await params;
    const { success, lessonData, message } = await getLessonById(lessonId);
    const token = (await cookies()).get("token");

    if (success) {
        const { lessonsData: lessonsArray } = await listLessonsByTopicAndTheme({
            themeSlug: lessonData!.theme.slug,
            topicSlug: lessonData!.topic.slug,
            token: token?.value,
        });

        if (lessonsArray) {
            checkCanMakeLesson(lessonsArray!, lessonData!);
        }
    }

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
